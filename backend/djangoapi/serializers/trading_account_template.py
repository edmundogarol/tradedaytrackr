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
            "image",
            "profit_target",
            "min_buffer",
            "min_trading_days",
            "min_day_pnl",
        ]

        read_only_fields = ["id"]

    def validate_account_size(self, value):
        if value <= 0:
            raise serializers.ValidationError("Account size must be positive")
        return value

    def validate_min_trading_days(self, value):
        if value < 0:
            raise serializers.ValidationError("Minimum trading days cannot be negative")
        return value

    def validate(self, data):
        is_eval = data.get("is_evaluation")

        profit_target = data.get("profit_target")
        min_buffer = data.get("min_buffer")

        if is_eval:
            if profit_target is None:
                raise serializers.ValidationError(
                    "Evaluation accounts require a profit target"
                )

        if not is_eval:
            if min_buffer is None:
                raise serializers.ValidationError(
                    "Non-evaluation accounts require a minimum buffer"
                )

        return data
