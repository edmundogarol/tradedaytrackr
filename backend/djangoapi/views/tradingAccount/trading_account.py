from django.db.models import Prefetch, Sum
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models import TradingAccount
from backend.djangoapi.models.trading_day import TradingDay
from backend.djangoapi.serializers.trading_account import TradingAccountSerializer


class TradingAccountViewSet(ModelViewSet):
    serializer_class = TradingAccountSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return (
            TradingAccount.objects.annotate(pnl=Sum("trades__pnl"))
            .filter(user=self.request.user)
            .select_related("template")
            .prefetch_related(
                Prefetch(
                    "trading_days",
                    queryset=TradingDay.objects.annotate(
                        pnl=Sum("trades__pnl")
                    ).order_by("-id"),
                )
            )
            .order_by("-id")
        )

    def perform_create(self, serializer):
        template = serializer.validated_data["template"]

        if template.user != self.request.user:
            raise PermissionDenied("Invalid template")

        serializer.save(user=self.request.user)
