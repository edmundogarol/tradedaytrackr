import logging

from django.db.models import Sum
from rest_framework import serializers

from backend.djangoapi.models import JournalEntry
from backend.djangoapi.serializers.trade import TradeSerializer

logger = logging.getLogger(__name__)


class JournalEntrySerializer(serializers.ModelSerializer):
    trades = TradeSerializer(many=True, read_only=True)
    totalPnL = serializers.SerializerMethodField()

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
        ]

    def get_totalPnL(self, obj):
        return obj.trades.aggregate(total=Sum("pnl"))["total"] or 0
