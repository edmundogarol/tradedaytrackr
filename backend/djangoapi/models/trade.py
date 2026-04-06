from django.db import models


class Trade(models.Model):
    journal_entry = models.ForeignKey(
        "JournalEntry",
        on_delete=models.CASCADE,
        related_name="trades",
        null=True,
        blank=True,
    )
    account = models.ForeignKey(
        "djangoapi.TradingAccount", on_delete=models.CASCADE, related_name="trades"
    )
    date_time = models.DateTimeField()
    pnl = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["account", "date_time"])]
