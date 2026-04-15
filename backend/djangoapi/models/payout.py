from django.db import models


class Payout(models.Model):
    account = models.ForeignKey(
        "TradingAccount", on_delete=models.CASCADE, related_name="payouts"
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)

    payout_date = models.DateTimeField()

    # snapshot at time of payout
    balance_before = models.DecimalField(max_digits=10, decimal_places=2)
    balance_after = models.DecimalField(max_digits=10, decimal_places=2)

    trading_days_in_cycle = models.IntegerField(default=0)
    total_pnl_in_cycle = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
