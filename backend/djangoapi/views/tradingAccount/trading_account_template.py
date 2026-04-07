from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models import TradingAccountTemplate
from backend.djangoapi.serializers.trading_account_template import (
    TradingAccountTemplateSerializer,
)


class TradingAccountTemplateViewSet(ModelViewSet):
    serializer_class = TradingAccountTemplateSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        return TradingAccountTemplate.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        print(self.request.FILES)
        serializer.save(user=self.request.user)
