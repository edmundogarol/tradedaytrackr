from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models import TradingDay
from backend.djangoapi.models.trading_account import TradingAccount


class TradingDaySerializer(serializers.ModelSerializer):
    day = serializers.IntegerField(source="day_number")
    account_id = serializers.PrimaryKeyRelatedField(
        queryset=TradingAccount.objects.all(),
        source="account",
        write_only=True,
    )

    class Meta:
        model = TradingDay
        fields = [
            "id",
            "account",
            "account_id",
            "day",
            "date",
            "created_at",
        ]

    def get_account(self, obj):
        return {
            "id": obj.account.id,
            "name": obj.account.account_name,
        }

    def validate_day(self, value):
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
