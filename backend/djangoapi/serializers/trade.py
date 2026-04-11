from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer
from backend.djangoapi.services.trades.trade_day import get_or_create_trading_day


class TradeSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(source="date_time")

    account = serializers.SerializerMethodField()
    account_id = serializers.PrimaryKeyRelatedField(
        queryset=TradingAccount.objects.all(), source="account", write_only=True
    )
    journal_entry = JournalEntrySerializer(read_only=True)
    journal_entry_id = serializers.PrimaryKeyRelatedField(
        queryset=JournalEntry.objects.all(),
        source="journal_entry",
        write_only=True,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Trade
        fields = [
            "id",
            "account",
            "account_id",
            "date",
            "pnl",
            "journal_entry",
            "journal_entry_id",
        ]

    def get_account(self, obj):
        return {
            "id": obj.account.id,
            "name": obj.account.account_name,
            "type": obj.account.template.name,
        }

    def validate_pnl(self, value):
        if value is None:
            raise serializers.ValidationError("PnL is required")
        return value

    def validate_journal_entry(self, value):
        if value and value.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid journal entry")
        return value

    def validate(self, data):
        if "date_time" in data and data["date_time"] > timezone.now():
            raise serializers.ValidationError("Trade date cannot be in the future")
        return data

    def create(self, validated_data):
        account = validated_data["account"]
        date = validated_data["date_time"].date()

        trading_day = get_or_create_trading_day(account, date)

        validated_data["trading_day"] = trading_day

        return super().create(validated_data)
