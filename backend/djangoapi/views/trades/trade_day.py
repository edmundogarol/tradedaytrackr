from django.db.models import Sum
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ReadOnlyModelViewSet

from backend.djangoapi.models.trading_day import TradingDay
from backend.djangoapi.serializers.trading_day import TradingDaySerializer


class TradingDayPagination(PageNumberPagination):
    page_size = 5


class TradingDayViewSet(ReadOnlyModelViewSet):
    serializer_class = TradingDaySerializer
    pagination_class = TradingDayPagination

    def get_queryset(self):
        user = self.request.user

        queryset = (
            TradingDay.objects.filter(account__user=user)
            .annotate(pnl=Sum("trades__pnl"))
            .order_by("-date")
            .prefetch_related("trades")
        )

        account_id = self.request.query_params.get("account_id")

        if account_id:
            queryset = queryset.filter(account_id=account_id)

        return queryset
