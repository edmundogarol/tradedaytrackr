import pytz
from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.models.trading_day import TradingDay
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer
from backend.djangoapi.serializers.trade import TradeSerializer
from backend.djangoapi.services.trades.trade_day import compute_trading_day_fields
from backend.djangoapi.utils.account import UserTimezoneDateTimeField


class TradingDaySerializer(serializers.ModelSerializer):
    account_id = serializers.PrimaryKeyRelatedField(
        queryset=TradingAccount.objects.all(),
        source="account",
        write_only=True,
    )
    pnl = serializers.SerializerMethodField()
    trades = serializers.SerializerMethodField()
    created_at = UserTimezoneDateTimeField(read_only=True)

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

    def get_trades(self, obj):
        trades = obj.trades.all()
        trade_data = TradeSerializer(trades, many=True).data

        user_tz = pytz.timezone(obj.account.user.timezone)

        # inject payouts for this day
        payouts = [
            p
            for p in Payout.objects.filter(account=obj.account)
            if p.payout_date.astimezone(user_tz).date() == obj.date
        ]

        date_field = UserTimezoneDateTimeField()
        payout_data = [
            {
                "id": f"payout-{p.id}",
                "date": date_field.to_representation(p.payout_date),
                "account": {
                    "id": p.account.id,
                },
                "journal_entry": JournalEntrySerializer(p.journal_entry).data
                if p.journal_entry
                else None,
                "pnl": -p.amount,
                "is_payout": True,
            }
            for p in payouts
        ]

        combined = trade_data + payout_data
        combined.sort(key=lambda x: x["date"])

        return combined

    def get_pnl(self, obj):
        return getattr(obj, "pnl", 0) or 0

    def validate_day_number(self, value):
        if value <= 0:
            raise serializers.ValidationError("Day number must be positive")
        return value

    def validate(self, data):
        request = self.context.get("request")
        user = request.user if request else None

        if "date" in data and user:
            user_tz = pytz.timezone(user.timezone)

            local_today = timezone.now().astimezone(user_tz).date()

            if data["date"] > local_today:
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
