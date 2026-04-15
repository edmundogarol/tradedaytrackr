import pytz
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.serializers.payout import (
    PayoutCreateSerializer,
    PayoutSerializer,
)
from backend.djangoapi.services.trades.trade_day import recompute_all_trading_days


class RecordPayoutView(APIView):
    def post(self, request):
        serializer = PayoutCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        account = serializer.validated_data["account"]
        amount = serializer.validated_data["amount"]

        user_tz = pytz.timezone(account.user.timezone)
        local_now = timezone.now().astimezone(user_tz)
        now = local_now.astimezone(pytz.UTC)

        current_balance = account.account_balance
        new_balance = current_balance - amount

        last_payout = (
            Payout.objects.filter(account=account).order_by("-payout_date").first()
        )

        payout = Payout.objects.create(
            account=account,
            amount=amount,
            payout_date=now,
            balance_before=current_balance,
            balance_after=new_balance,
        )

        # assign trades
        trades = Trade.objects.filter(account=account)

        if last_payout:
            trades = trades.filter(date_time__gt=last_payout.payout_date)

        trades = trades.filter(date_time__lte=now)
        trades.update(payout=payout)

        # update balance
        account.account_balance = new_balance
        account.save(update_fields=["account_balance"])

        recompute_all_trading_days(account)

        return Response(PayoutSerializer(payout).data)
