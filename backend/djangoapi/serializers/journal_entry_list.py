from django.db.models import Sum
from rest_framework import serializers

from backend.djangoapi.models.journal_entry import JournalEntry


class JournalEntryListSerializer(serializers.ModelSerializer):
    totalPnL = serializers.SerializerMethodField()
    accountCount = serializers.SerializerMethodField()

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

    def get_totalPnL(self, obj):
        return obj.trades.aggregate(total=Sum("pnl"))["total"] or 0

    def get_accountCount(self, obj):
        return obj.trades.count()
