from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models import Trade, TradingAccount


class TradeSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(source="date_time")

    account = serializers.SerializerMethodField()
    account_id = serializers.PrimaryKeyRelatedField(
        queryset=TradingAccount.objects.all(), source="account", write_only=True
    )

    class Meta:
        model = Trade
        fields = [
            "id",
            "account",
            "account_id",
            "date",
            "pnl",
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

    def validate(self, data):
        if "date_time" in data and data["date_time"] > timezone.now():
            raise serializers.ValidationError("Trade date cannot be in the future")
        return data
