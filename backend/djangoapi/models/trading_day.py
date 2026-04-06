from django.db import models


class TradingDay(models.Model):
    account = models.ForeignKey(
        "djangoapi.TradingAccount",
        on_delete=models.CASCADE,
        related_name="trading_days",
    )
    day_number = models.IntegerField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["account", "day_number"], name="unique_day_number_per_account"
            ),
            models.UniqueConstraint(
                fields=["account", "date"], name="unique_date_per_account"
            ),
        ]
        indexes = [
            models.Index(fields=["account", "date"]),
        ]
        ordering = ["day_number"]
