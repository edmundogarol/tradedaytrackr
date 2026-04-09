from django.db import models


class Rule(models.Model):
    RULE_TYPES = [
        ("STATIC_DRAWDOWN_AFTER_PAYOUT", "Static drawdown after payout"),
        # future rules go here
    ]

    name = models.CharField(max_length=100)
    rule_type = models.CharField(max_length=100, choices=RULE_TYPES)
    value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.rule_type})"
