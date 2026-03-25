from rest_framework import serializers

from backend.djangoapi.models import Trade


class TradeSerializer(serializers.ModelSerializer):
    account = serializers.CharField(source="account.account_name")
    date = serializers.DateTimeField(source="date_time")

    class Meta:
        model = Trade
        fields = [
            "id",
            "account",
            "date",
            "pnl",
        ]
