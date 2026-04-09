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

    for account in accounts:
        template = account.template

        account.baseline_balance = template.account_size
        account.account_balance = template.account_size
        account.save(update_fields=["baseline_balance", "account_balance"])

        if "Flex" in template.name:
            template.allowable_payout_request = 5000
            template.save(update_fields=["allowable_payout_request"])
            day_pnls = [1200, 1500, 1000, 1400, 1454]
        elif "Rapid" in template.name:
            day_pnls = [220, 210, 205, -50, 300]
        elif "Apex" in template.name:
            day_pnls = [500, -300, 700, 400, -200]
        else:
            day_pnls = [100, 150, -50, 200, 120]

        for idx, pnl in enumerate(day_pnls):
            date_time = base_date - timedelta(days=len(day_pnls) - idx)

            trading_day = get_or_create_trading_day(account, date_time.date())

            Trade.objects.create(
                account=account,
                trading_day=trading_day,
                date_time=date_time,
                pnl=pnl,
            )

        recompute_all_trading_days(account)
        recompute_account_balance(account)
