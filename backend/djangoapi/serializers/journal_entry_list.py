from rest_framework import serializers

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.serializers.tag import TagSerializer
from backend.djangoapi.serializers.trade import TradeSerializer


class JournalEntryListSerializer(serializers.ModelSerializer):
    total_pnl = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )
    trades = TradeSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    account_count = serializers.IntegerField(source="trade_count", read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = JournalEntry
        fields = [
            "id",
            "date_time",
            "risk",
            "contracts",
            "outcome",
            "description",
            "instrument",
            "image",
            "total_pnl",
            "account_count",
            "trades",
            "tags",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            return (
                request.build_absolute_uri(obj.image.url) if request else obj.image.url
            )
        return None
