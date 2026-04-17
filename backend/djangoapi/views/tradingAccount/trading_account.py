from django.db.models import Prefetch, Sum
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.models.trading_day import TradingDay
from backend.djangoapi.serializers.trading_account import TradingAccountSerializer


class TradingAccountViewSet(ModelViewSet):
    serializer_class = TradingAccountSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        base_qs = (
            TradingAccount.objects.annotate(pnl=Sum("trades__pnl"))
            .filter(user=self.request.user)
            .select_related("template")
            .prefetch_related(
                Prefetch(
                    "trading_days",
                    queryset=TradingDay.objects.annotate(pnl=Sum("trades__pnl"))
                    .prefetch_related(
                        Prefetch(
                            "trades",
                            queryset=Trade.objects.select_related("journal_entry"),
                        )
                    )
                    .order_by("-date"),
                )
            )
        )

        if self.action in ["archive", "unarchive", "destroy"]:
            return base_qs

        return base_qs.filter(is_archived=False).order_by("-id")

    def perform_create(self, serializer):
        template = serializer.validated_data["template"]

        if template.user != self.request.user:
            raise PermissionDenied("Invalid template")

        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def archive(self, request, pk=None):
        account = self.get_object()

        if account.user != request.user:
            return Response(
                {"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN
            )

        if account.is_archived:
            return Response({"detail": "Account already archived"}, status=400)

        account.is_archived = True
        account.archived_at = timezone.now()
        account.save(update_fields=["is_archived", "archived_at"])

        return Response({"detail": "Account archived successfully"})

    @action(detail=True, methods=["post"])
    def unarchive(self, request, pk=None):
        account = self.get_object()

        if account.user != request.user:
            return Response(
                {"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN
            )

        if not account.is_archived:
            return Response({"detail": "Account is not archived"}, status=400)

        account.is_archived = False
        account.archived_at = None
        account.save(update_fields=["is_archived", "archived_at"])

        return Response({"detail": "Account unarchived successfully"})


class TradingAccountArchivedViewSet(ModelViewSet):
    serializer_class = TradingAccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            TradingAccount.objects.archived()
            .annotate(pnl=Sum("trades__pnl"))
            .filter(user=self.request.user)
            .select_related("template")
            .prefetch_related(
                Prefetch(
                    "trading_days",
                    queryset=TradingDay.objects.annotate(pnl=Sum("trades__pnl"))
                    .prefetch_related(
                        Prefetch(
                            "trades",
                            queryset=Trade.objects.select_related("journal_entry"),
                        )
                    )
                    .order_by("-date"),
                )
            )
            .order_by("-id")
        )
