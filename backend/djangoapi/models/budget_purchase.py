from django.db import models

from backend.djangoapi.models.trading_account_template import ICON_CHOICES


class BudgetPurchase(models.Model):
    user = models.ForeignKey(
        "djangoapi.User", on_delete=models.CASCADE, related_name="budget_purchases"
    )
    firm = models.CharField(max_length=50, choices=ICON_CHOICES, null=True, blank=True)
    account_size = models.DecimalField(
        max_digits=12, decimal_places=2, null=True, blank=True
    )
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateTimeField()
    notes = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-purchase_date"]
        indexes = [
            models.Index(fields=["user"]),
        ]
