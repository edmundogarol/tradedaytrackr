from datetime import timedelta

from django.utils import timezone

from backend.djangoapi.models import Trade
from backend.djangoapi.services.trades.trade_day import (
    get_or_create_trading_day,
    recompute_all_trading_days,
)


def seed_demo_trade_days(user):
    accounts = user.trading_accounts.select_related("template").all()
    base_date = timezone.now()

    for account in accounts:
        template = account.template

        if "Flex" in template.name:
            day_pnls = [200, 250, -100, 180, 160]
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
