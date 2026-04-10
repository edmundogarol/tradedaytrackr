from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models import TradingDay
from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.serializers.trade import TradeSerializer
from backend.djangoapi.services.trades.trade_day import compute_trading_day_fields


class TradingDaySerializer(serializers.ModelSerializer):
    account_id = serializers.PrimaryKeyRelatedField(
        queryset=TradingAccount.objects.all(),
        source="account",
        write_only=True,
    )
    pnl = serializers.SerializerMethodField()
    trades = TradeSerializer(many=True, read_only=True)

    class Meta:
        model = TradingDay
        fields = [
            "id",
            "account",
            "account_id",
            "day_number",
            "date",
            "pnl",
            "is_valid_day",
            "created_at",
            "trades",
        ]
        read_only_fields = ["is_valid_day"]

    def get_account(self, obj):
        return {
            "id": obj.account.id,
            "name": obj.account.account_name,
        }

    def get_pnl(self, obj):
        return getattr(obj, "pnl", 0) or 0

    def validate_day_number(self, value):
        if value <= 0:
            raise serializers.ValidationError("Day number must be positive")
        return value

    def validate(self, data):
        # Ensure trading day is not in the future
        if "date" in data and data["date"] > timezone.now().date():
            raise serializers.ValidationError("Trading day cannot be in the future")

        # Enforce sequential day numbers per account
        account = data.get("account")
        if account:
            last_day = (
                TradingDay.objects.filter(account=account)
                .order_by("-day_number")
                .first()
            )

            expected_day = 1 if not last_day else last_day.day_number + 1

            if data.get("day_number") != expected_day:
                raise serializers.ValidationError(f"Next day must be {expected_day}")

        return data

    def create(self, validated_data):
        account = validated_data["account"]
        pnl = validated_data.get("pnl", 0)
        date = validated_data["date"]

        computed = compute_trading_day_fields(account, date, pnl)

        validated_data["is_valid_day"] = computed["is_valid_day"]
        validated_data["day_number"] = computed["day_number"]

        return super().create(validated_data)
