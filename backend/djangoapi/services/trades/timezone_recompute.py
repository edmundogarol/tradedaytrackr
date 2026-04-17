import pytz
from django.db.models.signals import post_save

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.models.trading_day import TradingDay
from backend.djangoapi.services.trades.trade_day import (
    get_or_create_trading_day,
    recompute_all_trading_days,
)
from backend.djangoapi.signals.trade import update_account_on_trade_save


def recompute_user_timezone(user):
    user_tz = pytz.timezone(user.timezone)

    accounts = user.trading_accounts.prefetch_related("trades").all()

    # disable signal
    post_save.disconnect(update_account_on_trade_save, sender=Trade)

    try:
        for account in accounts:
            trades = account.trades.all()

            for trade in trades:
                local_dt = trade.date_time.astimezone(user_tz)
                correct_date = local_dt.date()

                trading_day = get_or_create_trading_day(account, correct_date)

                if trade.trading_day_id != trading_day.id:
                    trade.trading_day = trading_day
                    trade.save(update_fields=["trading_day"])

            # clean empty days
            TradingDay.objects.filter(account=account, trades__isnull=True).delete()

            # recompute ONCE
            recompute_all_trading_days(account)

    finally:
        # re-enable signal
        post_save.connect(update_account_on_trade_save, sender=Trade)
