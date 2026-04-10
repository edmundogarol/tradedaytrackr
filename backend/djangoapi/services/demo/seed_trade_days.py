import random
from datetime import timedelta

from django.utils import timezone

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.services.trades.account_balance import recompute_account_balance
from backend.djangoapi.services.trades.trade_day import (
    get_or_create_trading_day,
    recompute_all_trading_days,
)


def seed_demo_trade_days(user):
    accounts = user.trading_accounts.select_related("template").all()
    base_date = timezone.now()

    random.seed(42)
    mffu_base = [400, 340, 580, 300, 310]

    for account in accounts:
        template = account.template

        # reset
        account.baseline_balance = template.account_size
        account.account_balance = template.account_size
        account.save(update_fields=["baseline_balance", "account_balance"])

        size = template.account_size
        multiplier = size / 50000

        seed = hash(account.account_name) % 100000
        random.seed(seed)

        def slight_variation(value):
            noise = random.uniform(-0.02, 0.02)
            return int(value * (1 + noise))

        def vary(value):
            noise = random.uniform(-0.15, 0.15)
            return int(value * (1 + noise))

        is_flex = "Flex" in template.name
        is_mffu = "MyFundedFutures" in template.name
        is_apex_funded = "Apex" in template.name and not template.is_evaluation
        is_apex_eval = "Apex" in template.name and template.is_evaluation

        if is_mffu and is_flex:
            day_pnls = [slight_variation(x * multiplier) for x in mffu_base]

        elif is_mffu:
            day_pnls = [slight_variation(x * multiplier) for x in mffu_base]

        elif is_apex_funded:
            base = [600, -400, 900, 300, -250]
            day_pnls = [vary(x * multiplier) for x in base]

        elif is_apex_eval:
            day_pnls = [500, -300, 700, 400, -200]

        else:
            day_pnls = [100, 150, -50, 200, 120]

        shared_day_times = []

        random.seed(999)  # stable across runs

        for i in range(len(day_pnls)):
            # generate a realistic trading time (NY session feel)
            hour = random.choice([9, 10, 11, 13, 14])
            minute = random.randint(0, 59)
            second = random.randint(0, 59)

            shared_day_times.append((hour, minute, second))

        for idx, pnl in enumerate(day_pnls):
            if is_mffu and is_flex:
                date = base_date - timedelta(days=len(day_pnls) - idx - 2)
            else:
                date = base_date - timedelta(days=len(day_pnls) - idx)

            hour, minute, second = shared_day_times[idx]

            date_time = date.replace(
                hour=hour,
                minute=minute,
                second=second,
                microsecond=0,
            )

            trading_day = get_or_create_trading_day(account, date_time.date())

            Trade.objects.create(
                account=account,
                trading_day=trading_day,
                date_time=date_time,
                pnl=pnl,
            )

        recompute_all_trading_days(account)
        recompute_account_balance(account)
