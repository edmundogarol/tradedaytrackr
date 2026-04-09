from django.db.models import Sum

from backend.djangoapi.models.trading_day import TradingDay


def compute_trading_day_fields(trading_day):
    account = trading_day.account

    pnl = trading_day.trades.aggregate(total=Sum("pnl"))["total"] or 0

    template = account.template
    min_profit = template.min_day_pnl or 0

    is_valid_day = pnl >= min_profit

    if not is_valid_day:
        return {
            "is_valid_day": False,
            "day_number": None,
        }

    last_valid_day = (
        TradingDay.objects.filter(account=account, is_valid_day=True)
        .exclude(id=trading_day.id)
        .order_by("-day_number")
        .first()
    )

    next_day_number = 1 if not last_valid_day else last_valid_day.day_number + 1

    return {
        "is_valid_day": True,
        "day_number": next_day_number,
    }


def get_or_create_trading_day(account, date):
    trading_day, _ = TradingDay.objects.get_or_create(
        account=account,
        date=date,
    )
    return trading_day


def recompute_all_trading_days(account):
    trading_days = TradingDay.objects.filter(account=account).order_by("date")

    current_day_number = 1

    for td in trading_days:
        pnl = td.pnl  # computed property

        template = account.template
        min_profit = template.min_day_pnl or 0
        is_valid = pnl >= min_profit

        if is_valid:
            td.day_number = current_day_number
            current_day_number += 1
        else:
            td.day_number = None

        td.is_valid_day = is_valid

        td.save(update_fields=["day_number", "is_valid_day"])
