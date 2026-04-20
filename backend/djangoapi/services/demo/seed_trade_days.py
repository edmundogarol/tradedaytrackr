import random
from datetime import timedelta

import pytz
from django.utils import timezone

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.services.trades.account_balance import recompute_account_balance
from backend.djangoapi.services.trades.trade_day import (
    get_or_create_trading_day,
    recompute_all_trading_days,
)


def ensure_weekday(dt):
    # 0 = Monday, 6 = Sunday
    while dt.weekday() >= 5:  # Sat(5), Sun(6)
        dt += timedelta(days=1)
    return dt


def get_previous_weekday(dt):
    dt -= timedelta(days=1)
    while dt.weekday() >= 5:
        dt -= timedelta(days=1)
    return dt


def seed_demo_trade_days(user):
    accounts = user.trading_accounts.select_related("template").all()
    base_date = timezone.now().astimezone(pytz.UTC)

    random.seed(42)
    mffu_base = [400, 340, 580, 300, 310]

    for account in accounts:
        user_tz = pytz.timezone(account.user.timezone)
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

        cycles = random.randint(3, 4)
        trades_per_cycle = random.randint(5, 7)

        day_pnls = []

        for _ in range(cycles):
            for _ in range(trades_per_cycle):
                pnl = random.randint(-300, 800)  # realistic spread
                day_pnls.append(pnl)

        shared_day_times = []

        random.seed(999)  # stable across runs

        for i in range(len(day_pnls)):
            # mix of safe + boundary-breaking times
            hour = random.choice(
                [
                    9,
                    10,
                    11,  # normal (no shift)
                    13,
                    14,  # normal
                    17,
                    18,
                    19,  # may shift
                    21,
                    22,
                    23,  # WILL shift for Asia
                ]
            )

            minute = random.randint(0, 59)
            second = random.randint(0, 59)

            shared_day_times.append((hour, minute, second))

        current_date = ensure_weekday(base_date)

        for idx, pnl in enumerate(day_pnls):
            if idx != 0:
                current_date = get_previous_weekday(current_date)

            hour, minute, second = shared_day_times[idx]

            local_date = current_date.astimezone(user_tz)
            local_dt = local_date.replace(
                hour=hour,
                minute=minute,
                second=second,
                microsecond=0,
            )
            date_time = local_dt.astimezone(pytz.UTC)

            local_dt = date_time.astimezone(user_tz)
            trading_day = get_or_create_trading_day(account, local_dt.date())

            Trade.objects.create(
                account=account,
                trading_day=trading_day,
                date_time=date_time,
                pnl=pnl,
            )

        recompute_all_trading_days(account)
        recompute_account_balance(account)
