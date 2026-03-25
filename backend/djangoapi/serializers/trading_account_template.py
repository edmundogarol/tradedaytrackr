from rest_framework import serializers

from backend.djangoapi.models import TradingAccountTemplate


class TradingAccountTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TradingAccountTemplate
        fields = [
            "id",
            "name",
            "firm",
            "account_size",
            "is_evaluation",
            "profit_target",
            "min_buffer",
            "min_trading_days",
            "min_day_pnl",
        ]
