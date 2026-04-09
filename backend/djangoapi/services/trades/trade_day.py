from backend.djangoapi.models.trading_day import TradingDay


def compute_trading_day_fields(account, date, pnl):
    min_profit = account.min_day_profit or 0

    is_valid_day = pnl >= min_profit

    if not is_valid_day:
        return {
            "is_valid_day": False,
            "day_number": None,
        }

    last_valid_day = (
        TradingDay.objects.filter(account=account, is_valid_day=True)
        .order_by("-day_number")
        .first()
    )

    next_day_number = 1 if not last_valid_day else last_valid_day.day_number + 1

    return {
        "is_valid_day": True,
        "day_number": next_day_number,
    }
