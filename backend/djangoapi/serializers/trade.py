from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models import Trade, TradingAccount
from backend.djangoapi.services.trades.trade_day import get_or_create_trading_day


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

    def create(self, validated_data):
        account = validated_data["account"]
        date = validated_data["date_time"].date()

        trading_day = get_or_create_trading_day(account, date)

        validated_data["trading_day"] = trading_day

        return super().create(validated_data)
