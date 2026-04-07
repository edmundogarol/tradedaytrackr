from django.db import models


class TradingAccountTemplate(models.Model):
    user = models.ForeignKey(
        "djangoapi.User",
        on_delete=models.CASCADE,
        related_name="trading_account_templates",
    )
    name = models.CharField(max_length=100)
    firm = models.CharField(max_length=100)
    account_size = models.IntegerField()
    is_evaluation = models.BooleanField()
    image = models.ImageField(
        upload_to="trading_account_templates/", blank=True, null=True
    )
    profit_target = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    profit_split = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )
    min_buffer = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    min_trading_days = models.IntegerField(null=True, blank=True)
    min_day_pnl = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    max_drawdown = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    consistency = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Percentage (e.g. 50 for 50%)",
    )
    allowable_payout_request = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Max % or amount allowed for payout request",
    )

    class Meta:
        ordering = ["-id"]
        indexes = [
            models.Index(fields=["user"]),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=["user", "name"], name="unique_template_per_user"
            )
        ]
