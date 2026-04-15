from decimal import Decimal

import pytz
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.services.trades.trade_day import recompute_all_trading_days


class RecordPayoutView(APIView):
    def post(self, request):
        account_id = request.data.get("account_id")
        amount = request.data.get("amount")

        account = TradingAccount.objects.get(id=account_id)
        current_balance = account.account_balance
        amount_decimal = Decimal(amount)

        user_tz = pytz.timezone(account.user.timezone)

        # 🔥 timezone-safe "now"
        local_now = timezone.now().astimezone(user_tz)
        now = local_now.astimezone(pytz.UTC)

        # get previous payout
        last_payout = (
            Payout.objects.filter(account=account).order_by("-payout_date").first()
        )

        new_balance = current_balance - amount_decimal

        payout = Payout.objects.create(
            account=account,
            amount=amount_decimal,
            payout_date=now,
            balance_before=current_balance,
            balance_after=new_balance,
        )

        # update correct field
        account.account_balance = new_balance
        account.save(update_fields=["account_balance"])

        # assign ONLY trades in this cycle
        trades = Trade.objects.filter(account=account)

        if last_payout:
            trades = trades.filter(date_time__gt=last_payout.payout_date)

        trades = trades.filter(date_time__lte=now)

        trades.update(payout=payout)

        recompute_all_trading_days(account)

        return Response({"status": "ok"})
