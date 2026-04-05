from rest_framework import serializers

from backend.djangoapi.models import Trade


class TradeSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(source="date_time")
    account = serializers.SerializerMethodField()

    class Meta:
        model = Trade
        fields = [
            "id",
            "account",
            "date",
            "pnl",
        ]

    def get_account(self, obj):
        return {
            "id": obj.account.id,
            "name": obj.account.account_name,
            "type": obj.account.template.name,
        }
