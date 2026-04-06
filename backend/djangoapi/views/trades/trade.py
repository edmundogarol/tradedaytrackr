from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models import Trade
from backend.djangoapi.serializers.trade import TradeSerializer


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
