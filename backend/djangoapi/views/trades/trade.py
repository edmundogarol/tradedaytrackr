from django.utils.timezone import localtime
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.serializers.trade import TradeSerializer
from backend.djangoapi.services.trades.trade_day import recompute_all_trading_days


def serialize_payout(payout):
    return {
        "id": f"payout-{payout.id}",  # avoid ID collision
        "type": "payout",
        "date_time": payout.payout_date,
        "pnl": -payout.amount,
        "is_payout": True,
    }


class TradeViewSet(ModelViewSet):
    serializer_class = TradeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Trade.objects.filter(account__user=self.request.user)
            .select_related("account", "account__template")
            .order_by("-date_time")
        )

    def perform_create(self, serializer):
        account = serializer.validated_data["account"]

        if account.user != self.request.user:
            raise PermissionDenied("Invalid account")

        serializer.save()

    def perform_destroy(self, instance):
        trading_day = instance.trading_day
        account = instance.account

        instance.delete()

        # check if payouts exist for this trading day
        has_payout = False

        if trading_day:
            payouts = Payout.objects.filter(account=account)

            has_payout = any(
                localtime(p.payout_date).date() == trading_day.date for p in payouts
            )

        # only delete if truly empty
        if trading_day and not trading_day.trades.exists() and not has_payout:
            trading_day.delete()

        recompute_all_trading_days(account)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        page = self.paginate_queryset(queryset)

        if page is not None:
            trade_data = self.get_serializer(page, many=True).data
        else:
            trade_data = self.get_serializer(queryset, many=True).data

        # get payouts
        payouts = Payout.objects.filter(account__user=request.user).order_by(
            "-payout_date"
        )

        payout_data = [serialize_payout(p) for p in payouts]

        # merge trades and payouts
        combined = trade_data + payout_data

        # sort (DESC to match your queryset)
        combined.sort(key=lambda x: x["date_time"], reverse=True)

        if page is not None:
            return self.get_paginated_response(combined)

        return Response(combined)
