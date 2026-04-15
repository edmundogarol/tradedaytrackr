from decimal import Decimal

from rest_framework import serializers

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trading_account import TradingAccount


class PayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payout
        fields = [
            "id",
            "account",
            "amount",
            "payout_date",
            "balance_before",
            "balance_after",
            "created_at",
        ]


class PayoutListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payout
        fields = [
            "id",
            "amount",
            "payout_date",
        ]


class PayoutCreateSerializer(serializers.Serializer):
    account_id = serializers.IntegerField()
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)

    def validate(self, data):
        account_id = data.get("account_id")
        amount = data.get("amount")

        try:
            account = TradingAccount.objects.get(id=account_id)
        except TradingAccount.DoesNotExist:
            raise serializers.ValidationError("Invalid account.")

        if amount <= 0:
            raise serializers.ValidationError("Amount must be greater than 0.")

        if amount > account.account_balance:
            raise serializers.ValidationError("Payout exceeds account balance.")

        data["account"] = account
        data["amount"] = Decimal(amount)

        return data
