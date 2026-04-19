import random
from datetime import timedelta
from decimal import Decimal

import pytz
from django.utils import timezone

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.services.trades.account_balance import recompute_account_balance
from backend.djangoapi.services.trades.trade_day import recompute_all_trading_days


def seed_demo_payouts(user):
    accounts = user.trading_accounts.select_related("template").all()

    for account in accounts:
        template = account.template

        # skip evals
        if template.is_evaluation:
            continue

        trades = Trade.objects.filter(account=account).order_by("date_time")

        if trades.count() < 5:
            continue

        # -----------------------------------
        # CONFIG
        # -----------------------------------
        cycles = random.randint(3, 4)
        trades_per_cycle = random.randint(5, 7)

        trade_list = list(trades)

        payouts_created = []
        start_idx = 0

        for cycle in range(cycles):
            end_idx = start_idx + trades_per_cycle

            if end_idx > len(trade_list):
                break

            cycle_trades = trade_list[start_idx:end_idx]

            # -----------------------------------
            # CALCULATE CYCLE PNL
            # -----------------------------------
            cycle_pnl = sum(t.pnl for t in cycle_trades)

            if cycle_pnl <= 0:
                # skip losing cycles
                start_idx = end_idx
                continue

            # -----------------------------------
            # DETERMINE PAYOUT AMOUNT
            # -----------------------------------
            payout_amount = Decimal(cycle_pnl)

            if template.withdrawal_split:
                payout_amount *= Decimal(template.withdrawal_split) / Decimal(100)

            if template.max_payout_request and template.max_payout_request > 0:
                payout_amount = min(
                    payout_amount,
                    template.max_payout_request,
                )

            if template.min_payout_request:
                if payout_amount < template.min_payout_request:
                    start_idx = end_idx
                    continue

            # -----------------------------------
            # PAYOUT DATE = LAST TRADE IN CYCLE
            # -----------------------------------
            payout_date = cycle_trades[-1].date_time

            # -----------------------------------
            # CREATE PAYOUT
            # -----------------------------------
            payout = Payout.objects.create(
                account=account,
                amount=payout_amount,
                payout_date=payout_date,
                balance_before=account.account_balance,
                balance_after=account.account_balance - payout_amount,
                trading_days_in_cycle=len(cycle_trades),
                total_pnl_in_cycle=cycle_pnl,
            )

            payouts_created.append(payout)

            # -----------------------------------
            # LINK TRADES → PAYOUT
            # -----------------------------------
            Trade.objects.filter(id__in=[t.id for t in cycle_trades]).update(
                payout=payout
            )

            # -----------------------------------
            # UPDATE ACCOUNT BALANCE
            # -----------------------------------
            account.account_balance -= payout_amount
            account.save(update_fields=["account_balance"])

            start_idx = end_idx

        # -----------------------------------
        # FINAL RECOMPUTE (CLEAN STATE)
        # -----------------------------------
        recompute_account_balance(account)
        recompute_all_trading_days(account)


def seed_historical_payouts(user):
    accounts = user.trading_accounts.select_related("template").all()
    now = timezone.now().astimezone(pytz.UTC)

    for account in accounts:
        template = account.template

        # skip eval accounts
        if template.is_evaluation:
            continue

        # create 3–6 historical payouts
        num_payouts = random.randint(3, 6)

        for i in range(num_payouts):
            # random month in past (1–6 months ago)
            months_back = random.randint(1, 6)

            payout_date = now - timedelta(days=30 * months_back)

            # random realistic payout amount
            base = Decimal(template.min_payout_request or 200)
            variation = Decimal(random.randint(200, 1500))

            amount = base + variation

            if template.max_payout_request and template.max_payout_request > 0:
                amount = min(amount, template.max_payout_request)

            Payout.objects.create(
                account=account,
                amount=amount,
                payout_date=payout_date,
                balance_before=account.account_balance,
                balance_after=account.account_balance,  # no balance mutation
                trading_days_in_cycle=random.randint(5, 10),
                total_pnl_in_cycle=amount,
            )
