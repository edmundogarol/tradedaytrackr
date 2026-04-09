from django.db.models import Sum


def recompute_account_balance(account):
    total_pnl = account.trades.aggregate(total=Sum("pnl"))["total"] or 0

    starting_balance = account.baseline_balance or 0

    account.account_balance = starting_balance + total_pnl
    account.save(update_fields=["account_balance"])
