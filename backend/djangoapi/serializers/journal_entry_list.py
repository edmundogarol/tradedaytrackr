from rest_framework import serializers

from backend.djangoapi.models.journal_entry import JournalEntry


class JournalEntryListSerializer(serializers.ModelSerializer):
    totalPnL = serializers.DecimalField(
        max_digits=10, decimal_places=2, source="total_pnl", read_only=True
    )
    accountCount = serializers.IntegerField(source="trade_count", read_only=True)

    class Meta:
        model = JournalEntry
        fields = [
            "id",
            "date_time",
            "description",
            "instrument",
            "totalPnL",
            "accountCount",
        ]
