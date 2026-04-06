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

    def validate_tags(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Tags must be a list")
        return [str(tag).lower() for tag in value]

    def validate(self, data):
        if "contracts" in data and data["contracts"] <= 0:
            raise serializers.ValidationError("Contracts must be positive")

        if "risk" in data and data["risk"] < 0:
            raise serializers.ValidationError("Risk cannot be negative")

        return data
