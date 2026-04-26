from django.db.models import Count, F

from backend.djangoapi.serializers.trade import TradeSerializer
from backend.djangoapi.services.reports.metrics import MetricsEngine
from backend.djangoapi.services.reports.query_builder import ReportQueryBuilder


class ReportService:
    def __init__(self, user, filters):
        self.user = user
        self.filters = filters

    def generate(self):
        qs = ReportQueryBuilder(self.user, self.filters).build()

        engine = MetricsEngine(qs)

        return {
            "overview": engine.overview(),
            "equity_curve": engine.equity_curve(),
            "pnl_distribution": engine.distribution(),
            "performance_by_day": engine.performance_by_day(),
            "key_stats": engine.streaks(),
            "risk_management": engine.risk(),
            "tags": self._tag_cloud(qs),
            "recent_trades": self._recent_trades(qs),
        }

    def _recent_trades(self, qs):
        return TradeSerializer(qs.order_by("-date_time")[:10], many=True).data

    def _tag_cloud(self, qs):
        return (
            qs.values(name=F("journal_entry__tags__name"))
            .annotate(count=Count("journal_entry__tags"))
            .exclude(journal_entry__tags__name__isnull=True)
            .order_by("-count")
        )
