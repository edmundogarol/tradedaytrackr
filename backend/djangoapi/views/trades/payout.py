from decimal import Decimal

import pytz
from django.db import transaction
from django.utils.dateparse import parse_datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView, PermissionDenied

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.models.trading_day import TradingDay
from backend.djangoapi.serializers.payout import (
    PayoutCreateSerializer,
    PayoutSerializer,
)
from backend.djangoapi.services.trades.account_balance import recompute_account_balance
from backend.djangoapi.services.trades.trade_day import (
    get_or_create_trading_day,
    recompute_all_trading_days,
)


class RecordPayoutView(APIView):
    def post(self, request):
        serializer = PayoutCreateSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        account = serializer.validated_data["account"]
        amount = serializer.validated_data["amount"]

        payout_date = serializer.validated_data["payout_date"]
        journal_entry = serializer.validated_data.get("journal_entry")

        last_payout = (
            Payout.objects.filter(account=account).order_by("-payout_date").first()
        )

        payout = Payout.objects.create(
            account=account,
            amount=abs(amount),
            payout_date=payout_date,
            journal_entry=journal_entry,
            balance_before=account.account_balance,
            balance_after=account.account_balance - abs(amount),
        )

        # ENSURE trading day exists
        user_tz = pytz.timezone(account.user.timezone)
        local_date = payout_date.astimezone(user_tz).date()
        get_or_create_trading_day(account, local_date)

        # assign trades
        trades = Trade.objects.filter(account=account)

        if last_payout:
            trades = trades.filter(date_time__gt=last_payout.payout_date)

        trades = trades.filter(date_time__lte=payout_date)
        trades.update(payout=payout)

        # update balance
        recompute_account_balance(account)
        recompute_all_trading_days(account)

        return Response(PayoutSerializer(payout).data)


class UpdatePayoutView(APIView):
    def patch(self, request, payout_id):
        payout = Payout.objects.get(id=payout_id)
        account = payout.account

        user_tz = pytz.timezone(account.user.timezone)

        if payout.journal_entry and payout.journal_entry.user != request.user:
            raise PermissionDenied("Invalid journal entry")

        with transaction.atomic():
            # store old values
            old_amount = abs(payout.amount)
            old_date = payout.payout_date

            # get new values (fallback to old)
            new_amount = Decimal(request.data.get("amount", old_amount))
            new_date = request.data.get("payout_date")

            if new_date:
                parsed = parse_datetime(new_date)

                if parsed is None:
                    raise ValueError("Invalid datetime format")

                # handle both cases
                if parsed.tzinfo is None:
                    # naive → assume user timezone
                    parsed = user_tz.localize(parsed)
                else:
                    # aware → convert to user timezone first (optional but clean)
                    parsed = parsed.astimezone(user_tz)

                # finally convert to UTC
                new_date = parsed.astimezone(pytz.UTC)
            else:
                new_date = old_date

            journal_entry_id = request.data.get("journal_entry_id")

            if "journal_entry_id" in request.data:
                if journal_entry_id is None:
                    payout.journal_entry = None
                else:
                    payout.journal_entry = JournalEntry.objects.get(id=journal_entry_id)

            # update payout
            payout.amount = new_amount
            payout.payout_date = new_date
            payout.save(update_fields=["amount", "payout_date", "journal_entry"])

            # RESET ALL TRADE → PAYOUT LINKS
            Trade.objects.filter(account=account).update(payout=None)

            # REASSIGN TRADES BASED ON PAYOUT ORDER
            payouts = Payout.objects.filter(account=account).order_by("payout_date")

            previous_date = None

            for p in payouts:
                trades = Trade.objects.filter(account=account)

                if previous_date:
                    trades = trades.filter(date_time__gt=previous_date)

                trades = trades.filter(date_time__lte=p.payout_date)
                trades.update(payout=p)

                previous_date = p.payout_date

            # recompute balances and trading days
            recompute_account_balance(account)
            recompute_all_trading_days(account)

        return Response(PayoutSerializer(payout).data)

    def delete(self, request, payout_id):
        payout = Payout.objects.get(id=payout_id)
        account = payout.account

        with transaction.atomic():
            # delete payout
            payout.delete()

            # reset trade → payout links
            Trade.objects.filter(account=account).update(payout=None)

            # reassign trades to payouts in order
            payouts = Payout.objects.filter(account=account).order_by("payout_date")

            previous_date = None

            for p in payouts:
                trades = Trade.objects.filter(account=account)

                if previous_date:
                    trades = trades.filter(date_time__gt=previous_date)

                trades = trades.filter(date_time__lte=p.payout_date)
                trades.update(payout=p)

                previous_date = p.payout_date

            # recompute balances and trading days
            recompute_account_balance(account)
            recompute_all_trading_days(account)

            user_tz = pytz.timezone(account.user.timezone)

            trading_days = TradingDay.objects.filter(account=account)

            for td in trading_days:
                has_trades = td.trades.exists()

                has_payout = any(
                    p.payout_date.astimezone(user_tz).date() == td.date
                    for p in Payout.objects.filter(account=account)
                )

                if not has_trades and not has_payout:
                    td.delete()

        return Response({"status": "deleted"}, status=status.HTTP_200_OK)
