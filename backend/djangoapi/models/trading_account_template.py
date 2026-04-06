from django.db import models


class TradingAccountTemplate(models.Model):
    name = models.CharField(max_length=100)
    firm = models.CharField(max_length=100)
    account_size = models.IntegerField()
    is_evaluation = models.BooleanField()
    image = models.URLField(blank=True, null=True)
    profit_target = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    min_buffer = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    min_trading_days = models.IntegerField(default=0)
    min_day_pnl = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
