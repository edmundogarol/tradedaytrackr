import pytz
from django.db.models import Sum

from backend.djangoapi.models.payout import Payout
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
    trading_days = (
        TradingDay.objects.annotate(pnl=Sum("trades__pnl"))
        .filter(account=account)
        .order_by("date", "id")
    )

    current_day_number = 1

    user_tz = pytz.timezone(account.user.timezone)

    payouts = list(Payout.objects.filter(account=account).order_by("payout_date"))
    payout_index = 0
    current_payout = payouts[payout_index] if payouts else None

    for td in trading_days:
        fields_to_update = ["day_number", "is_valid_day"]

        crossed_payout = False

        first_trade = None

        if td.trades.exists():
            first_trade = td.trades.order_by("date_time").first()

            # timezone fix logic...
            local_dt = first_trade.date_time.astimezone(user_tz)
            correct_date = local_dt.date()

            if td.date != correct_date:
                td.date = correct_date
                fields_to_update.append("date")

            # payout crossing logic
            while current_payout and first_trade.date_time > current_payout.payout_date:
                crossed_payout = True
                payout_index += 1
                current_payout = (
                    payouts[payout_index] if payout_index < len(payouts) else None
                )

        if crossed_payout:
            current_day_number = 1

        pnl = td.pnl or 0

        template = account.template
        min_profit = template.min_day_pnl or 0
        is_valid = pnl >= min_profit

        if is_valid:
            td.day_number = current_day_number
            current_day_number += 1
        else:
            td.day_number = None

        td.is_valid_day = is_valid

        td.save(update_fields=fields_to_update)
