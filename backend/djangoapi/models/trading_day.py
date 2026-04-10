from django.db import models
from django.db.models import Sum


class TradingDay(models.Model):
    account = models.ForeignKey(
        "djangoapi.TradingAccount",
        on_delete=models.CASCADE,
        related_name="trading_days",
    )
    date = models.DateField()

    day_number = models.IntegerField(null=True, blank=True)
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
        ordering = ["-id"]

    @property
    def journal_pnl(self):
        return (
            self.trades.filter(journal_entry__isnull=False).aggregate(total=Sum("pnl"))[
                "total"
            ]
            or 0
        )
