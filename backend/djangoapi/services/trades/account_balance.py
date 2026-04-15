from django.db.models import Sum

from backend.djangoapi.models.payout import Payout


def recompute_account_balance(account):
    trades_total = account.trades.aggregate(total=Sum("pnl"))["total"] or 0

    payouts_total = (
        Payout.objects.filter(account=account).aggregate(total=Sum("amount"))["total"]
        or 0
    )

    starting_balance = account.baseline_balance or 0

    account.account_balance = starting_balance + trades_total - payouts_total
    account.save(update_fields=["account_balance"])
