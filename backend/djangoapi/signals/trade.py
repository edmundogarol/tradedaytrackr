from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.services.trades.account_balance import recompute_account_balance
from backend.djangoapi.services.trades.trade_day import recompute_all_trading_days


@receiver(post_save, sender=Trade)
def update_account_on_trade_save(sender, instance, **kwargs):
    if kwargs.get("raw", False):
        return

    account = instance.account
    if not account or not account.pk:
        return

    recompute_all_trading_days(account)
    recompute_account_balance(account)


@receiver(post_delete, sender=Trade)
def update_account_on_trade_delete(sender, instance, **kwargs):
    if kwargs.get("raw", False):
        return

    account = instance.account
    if not account or not account.pk:
        return

    recompute_all_trading_days(account)
    recompute_account_balance(account)
