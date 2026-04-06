import logging

from rest_framework import serializers

from backend.djangoapi.models import JournalEntry
from backend.djangoapi.serializers.trade import TradeSerializer

logger = logging.getLogger(__name__)


class JournalEntrySerializer(serializers.ModelSerializer):
    trades = TradeSerializer(many=True, read_only=True)
    totalPnL = serializers.DecimalField(
        max_digits=10, decimal_places=2, source="total_pnl", read_only=True
    )
    accountCount = serializers.IntegerField(source="trade_count", read_only=True)

    class Meta:
        model = JournalEntry
        fields = [
            "id",
            "date_time",
            "instrument",
            "risk",
            "contracts",
            "outcome",
            "description",
            "image",
            "tags",
            "trades",
            "totalPnL",
            "accountCount",
        ]

    def get_totalPnL(self, obj):
        return obj.total_pnl or 0

    def get_accountCount(self, obj):
        return obj.trade_count or 0
