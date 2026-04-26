from backend.djangoapi.models.trade import Trade


class TradeReportService:
    def __init__(self, user, filters):
        self.user = user
        self.filters = filters

    def get_queryset(self):
        qs = Trade.objects.filter(user=self.user)

        if self.filters.get("account_id"):
            qs = qs.filter(account_id=self.filters["account_id"])

        if self.filters.get("start"):
            qs = qs.filter(date__gte=self.filters["start"])

        if self.filters.get("end"):
            qs = qs.filter(date__lte=self.filters["end"])

        if self.filters.get("tags"):
            qs = qs.filter(tags__name__in=self.filters["tags"]).distinct()

        return qs.select_related("account").prefetch_related("tags")
