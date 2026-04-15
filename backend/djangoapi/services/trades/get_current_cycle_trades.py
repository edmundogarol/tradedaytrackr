from backend.djangoapi.models.trade import Trade


def get_current_cycle_trades(account):
    last_payout = account.payouts.order_by("-payout_date").first()

    if not last_payout:
        return Trade.objects.filter(account=account)

    return Trade.objects.filter(account=account, date_time__gt=last_payout.payout_date)
