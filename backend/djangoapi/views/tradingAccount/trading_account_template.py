from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models import TradingAccountTemplate
from backend.djangoapi.serializers.trading_account_template import (
    TradingAccountTemplateSerializer,
)


class TradingAccountTemplateViewSet(ModelViewSet):
    serializer_class = TradingAccountTemplateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TradingAccountTemplate.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
