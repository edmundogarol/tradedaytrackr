from django.db import models


class TradingDay(models.Model):
    account = models.ForeignKey(
        "djangoapi.TradingAccount",
        on_delete=models.CASCADE,
        related_name="trading_days",
    )
    date = models.DateField()
    pnl = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    day_number = models.IntegerField()  # derived
    is_valid_day = models.BooleanField(default=False)  # derived

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["account", "date"], name="unique_date_per_account"
            ),
        ]
        indexes = [
            models.Index(fields=["account", "date"]),
        ]
        ordering = ["day_number"]
