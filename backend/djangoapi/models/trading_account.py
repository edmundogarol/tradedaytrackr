from django.db import models

from backend.djangoapi.querysets.trading_account_queryset import TradingAccountQuerySet


class TradingAccount(models.Model):
    user = models.ForeignKey(
        "djangoapi.User", on_delete=models.CASCADE, related_name="trading_accounts"
    )
    objects = TradingAccountQuerySet.as_manager()
    template = models.ForeignKey(
        "djangoapi.TradingAccountTemplate",
        on_delete=models.PROTECT,
        related_name="accounts",
    )
    account_name = models.CharField(max_length=150)
    account_balance = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
