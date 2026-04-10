import random
from datetime import timedelta

from django.utils import timezone

from backend.djangoapi.models import Trade
from backend.djangoapi.services.trades.account_balance import recompute_account_balance
from backend.djangoapi.services.trades.trade_day import (
    get_or_create_trading_day,
    recompute_all_trading_days,
)


def seed_demo_trade_days(user):
    accounts = user.trading_accounts.select_related("template").all()
    base_date = timezone.now()

    # ---------------------------------
    # ONE SHARED MFFU TRADE STREAM
    # ---------------------------------
    random.seed(42)
    mffu_base = [400, 340, 580, 300, 310]  # same trades for ALL MFFU accounts

    for account in accounts:
        template = account.template

        # reset
        account.baseline_balance = template.account_size
        account.account_balance = template.account_size
        account.save(update_fields=["baseline_balance", "account_balance"])

        size = template.account_size
        multiplier = size / 50000

        # ---------------------------------
        # SMALL ACCOUNT-SPECIFIC NOISE (±2%)
        # ---------------------------------
        seed = hash(account.account_name) % 100000
        random.seed(seed)

        def slight_variation(value):
            noise = random.uniform(-0.02, 0.02)  # tighter = more "copy trading"
            return int(value * (1 + noise))

        # ---------------------------------
        # ALL MFFU (FLEX + RAPID)
        # ---------------------------------
        if "MyFundedFutures" in template.name:
            day_pnls = [slight_variation(x * multiplier) for x in mffu_base]

        # ---------------------------------
        # APEX FUNDED (INDIVIDUAL)
        # ---------------------------------
        elif "Apex" in template.name and not template.is_evaluation:
            base = [600, -400, 900, 300, -250]

            def vary(value):
                noise = random.uniform(-0.15, 0.15)
                return int(value * (1 + noise))

            day_pnls = [vary(x * multiplier) for x in base]

        # ---------------------------------
        # APEX EVAL
        # ---------------------------------
        elif "Apex" in template.name:
            day_pnls = [500, -300, 700, 400, -200]

        # ---------------------------------
        # FALLBACK
        # ---------------------------------
        else:
            day_pnls = [100, 150, -50, 200, 120]

        # ---------------------------------
        # CREATE TRADES
        # ---------------------------------
        for idx, pnl in enumerate(day_pnls):
            date_time = base_date - timedelta(days=len(day_pnls) - idx)

            trading_day = get_or_create_trading_day(account, date_time.date())

            Trade.objects.create(
                account=account,
                trading_day=trading_day,
                date_time=date_time,
                pnl=pnl,
            )

        # ---------------------------------
        # RECOMPUTE
        # ---------------------------------
        recompute_all_trading_days(account)
        recompute_account_balance(account)
