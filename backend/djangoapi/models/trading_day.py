from django.db import models

from backend.djangoapi.models.trading_account import TradingAccount


class TradingDay(models.Model):
    account = models.ForeignKey(
        TradingAccount, on_delete=models.CASCADE, related_name="trading_days"
    )
    date = models.DateField()
    entry_time = models.TimeField()
    pnl = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True, null=True)
    day_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["account", "entry_time"]
        indexes = [models.Index(fields=["account", "entry_time"])]
