from rest_framework import serializers

from backend.djangoapi.models.journal_entry import JournalEntry


class JournalEntryListSerializer(serializers.ModelSerializer):
    total_pnl = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )

    account_count = serializers.IntegerField(source="trade_count", read_only=True)

    class Meta:
        model = JournalEntry
        fields = [
            "id",
            "date_time",
            "description",
            "instrument",
            "total_pnl",
            "account_count",
        ]
