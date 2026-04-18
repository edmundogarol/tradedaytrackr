import pytz
from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer


class PayoutSerializer(serializers.ModelSerializer):
    journal_entry = JournalEntrySerializer(read_only=True)
    account = serializers.SerializerMethodField()

    class Meta:
        model = Payout
        fields = [
            "id",
            "account",
            "amount",
            "payout_date",
            "balance_before",
            "balance_after",
            "journal_entry",
            "created_at",
        ]

    def get_account(self, obj):
        return {
            "id": obj.account.id,
            "name": obj.account.account_name,
        }


class PayoutListSerializer(serializers.ModelSerializer):
    account = serializers.SerializerMethodField()
    cycle_start = serializers.SerializerMethodField()
    cycle_end = serializers.SerializerMethodField()

    class Meta:
        model = Payout
        fields = [
            "id",
            "account",
            "amount",
            "payout_date",
            "trading_days_in_cycle",
            "cycle_start",
            "cycle_end",
        ]

    def get_account(self, obj):
        return {
            "id": obj.account.id,
            "name": obj.account.account_name,
        }

    def get_cycle_start(self, obj):
        # last payout before this one
        last_payout = (
            obj.account.payouts.filter(payout_date__lt=obj.payout_date)
            .order_by("-payout_date")
            .first()
        )

        trades = Trade.objects.filter(account=obj.account)

        if last_payout:
            trades = trades.filter(date_time__gt=last_payout.payout_date)

        first_trade = trades.order_by("date_time").first()

        return first_trade.date_time if first_trade else obj.payout_date

    def get_cycle_end(self, obj):
        return obj.payout_date


class PayoutCreateSerializer(serializers.ModelSerializer):
    payout_date = serializers.DateTimeField(required=False)
    journal_entry_id = serializers.PrimaryKeyRelatedField(
        queryset=JournalEntry.objects.all(),
        source="journal_entry",
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Payout
        fields = ["account", "amount", "payout_date", "journal_entry_id"]

    def validate(self, data):
        request = self.context.get("request")
        if not request:
            raise serializers.ValidationError("Request context missing")

        user = request.user
        user_tz = pytz.timezone(user.timezone)

        payout_date = data.get("payout_date")

        # fallback to now if not provided
        if not payout_date:
            local_now = timezone.now().astimezone(user_tz)
            data["payout_date"] = local_now.astimezone(pytz.UTC)
            return data

        # normalize datetime (handle naive + aware)
        if timezone.is_naive(payout_date):
            payout_date = user_tz.localize(payout_date)
        else:
            payout_date = payout_date.astimezone(user_tz)

        # validate future
        user_now = timezone.now().astimezone(user_tz)
        if payout_date > user_now:
            raise serializers.ValidationError("Payout date cannot be in the future")

        # store in UTC
        data["payout_date"] = payout_date.astimezone(pytz.UTC)

        return data
