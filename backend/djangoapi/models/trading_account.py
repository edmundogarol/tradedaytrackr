from django.db import models
from django.utils import timezone

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
    baseline_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)
    archived_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def archive(self):
        self.is_archived = True
        self.archived_at = timezone.now()
        self.save(update_fields=["is_archived", "archived_at"])

    def unarchive(self):
        self.is_archived = False
        self.archived_at = None
        self.save(update_fields=["is_archived", "archived_at"])
