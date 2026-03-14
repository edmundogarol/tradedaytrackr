from django.db import models
from backend.djangoapi.models.trading_account import TradingAccount


class Trade(models.Model):

    journal_entry = models.ForeignKey(
        "JournalEntry",
        on_delete=models.CASCADE,
        related_name="entry_trades",
        null=True,
        blank=True,
    )
    account = models.ForeignKey(
        TradingAccount, on_delete=models.CASCADE, related_name="trades"
    )
    date_time = models.DateTimeField()
    pnl = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["account", "date_time"])]
