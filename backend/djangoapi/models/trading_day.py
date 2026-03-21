from django.db import models

from backend.djangoapi.models.trading_account import TradingAccount


class TradingDay(models.Model):

    account = models.ForeignKey(
        TradingAccount, on_delete=models.CASCADE, related_name="trading_days"
    )
    day_number = models.IntegerField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["account", "day_number"]

        indexes = [
            models.Index(fields=["account", "date"]),
        ]
