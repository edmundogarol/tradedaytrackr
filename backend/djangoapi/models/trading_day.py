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
        unique_together = ["account", "day_number"]

        indexes = [
            models.Index(fields=["account", "date"]),
        ]
