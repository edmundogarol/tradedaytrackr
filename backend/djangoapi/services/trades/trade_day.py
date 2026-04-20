from django.db.models import Min, Sum

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trading_day import TradingDay


def is_valid_trading_day(template, pnl):
    if template.is_evaluation:
        return True
    return pnl >= (template.min_day_pnl or 0)


def compute_trading_day_fields(trading_day):
    account = trading_day.account

    pnl = trading_day.trades.aggregate(total=Sum("pnl"))["total"] or 0
    template = account.template

    is_valid_day = is_valid_trading_day(template, pnl)

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
    trading_days = (
        TradingDay.objects.filter(account=account)
        .annotate(
            pnl=Sum("trades__pnl"),
            first_trade_time=Min("trades__date_time"),
        )
        .order_by("date", "id")
    )

    current_day_number = 1
    template = account.template

    payouts = list(Payout.objects.filter(account=account).order_by("payout_date"))
    payout_index = 0
    current_payout = payouts[payout_index] if payouts else None

    updates = []

    for td in trading_days:
        crossed_payout = False
        first_trade_time = td.first_trade_time

        # Handle payout crossing
        while (
            current_payout
            and first_trade_time
            and first_trade_time > current_payout.payout_date
        ):
            crossed_payout = True
            payout_index += 1
            current_payout = (
                payouts[payout_index] if payout_index < len(payouts) else None
            )

        if crossed_payout:
            current_day_number = 1

        pnl = td.pnl or 0
        is_valid = is_valid_trading_day(template, pnl)

        if is_valid:
            td.day_number = current_day_number
            current_day_number += 1
        else:
            td.day_number = None

        td.is_valid_day = is_valid
        updates.append(td)

    if updates:
        TradingDay.objects.bulk_update(updates, ["day_number", "is_valid_day"])
