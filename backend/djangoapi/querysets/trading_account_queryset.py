from django.db import models
from django.db.models import Max, Sum, F


class TradingAccountQuerySet(models.QuerySet):
    def funded(self):
        return self.filter(template__is_evaluation=False)

    def evaluations(self):
        return self.filter(template__is_evaluation=True)

    def with_consistency_score(self):
        return self.annotate(
            total_profit=Sum("trading_days__pnl"),
            largest_day=Max("trading_days__pnl"),
        ).annotate(consistency_score=F("largest_day") / F("total_profit"))
