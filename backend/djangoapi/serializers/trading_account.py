import os

from rest_framework import serializers

from backend.djangoapi.models import TradingAccount, TradingAccountTemplate
from backend.djangoapi.serializers.trading_day import TradingDaySerializer


class TradingAccountSerializer(serializers.ModelSerializer):
    template_id = serializers.PrimaryKeyRelatedField(
        queryset=TradingAccountTemplate.objects.all(),
        source="template",
        write_only=True,
    )

    is_eval = serializers.BooleanField(source="template.is_evaluation", read_only=True)

    account_size = serializers.IntegerField(
        source="template.account_size",
        read_only=True,
        default=0,
    )

    firm = serializers.CharField(source="template.firm", read_only=True)

    account_type = serializers.SerializerMethodField()

    image = serializers.SerializerMethodField()

    profit_target = serializers.DecimalField(
        source="template.profit_target",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    min_buffer = serializers.DecimalField(
        source="template.min_buffer",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    min_trading_days = serializers.IntegerField(
        source="template.min_trading_days",
        read_only=True,
    )

    min_day_pnl = serializers.DecimalField(
        source="template.min_day_pnl",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    day_values = TradingDaySerializer(
        source="trading_days",
        many=True,
        read_only=True,
    )

    buffer_percent = serializers.SerializerMethodField()
    current_day_count = serializers.SerializerMethodField()

    class Meta:
        model = TradingAccount
        fields = [
            "id",
            "account_name",
            "account_balance",
            "buffer_percent",
            "template_id",
            "account_size",
            "image",
            "firm",
            "account_type",
            "is_eval",
            "profit_target",
            "min_buffer",
            "min_trading_days",
            "min_day_pnl",
            "day_values",
            "current_day_count",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        display_image = obj.template.display_image

        if request and display_image.startswith("/"):
            if "DEVENV" in os.environ:
                return request.build_absolute_uri(display_image).replace(
                    "http://localhost:8000", "http://localhost:3000"
                )

            return request.build_absolute_uri(display_image)

        return display_image

    def get_account_type(self, obj):
        return {
            "id": obj.template.id,
            "name": obj.template.name,
            "is_eval": obj.template.is_evaluation,
        }

    def get_buffer_percent(self, obj):
        min_buffer = obj.template.min_buffer
        balance = obj.account_balance - obj.template.account_size

        if not min_buffer or min_buffer == 0:
            return 0

        progress = (balance / min_buffer) * 100

        return min(round(progress, 2), 100)

    def get_current_day_count(self, obj):
        day_numbers = [day.day_number for day in obj.trading_days.all()]

        return max(day_numbers, default=0)

    def validate_account_balance(self, value):
        if value < 0:
            raise serializers.ValidationError("Balance cannot be negative")

        if self.instance:
            template = self.instance.template
        else:
            template = self.initial_data.get("template_id")
            if template:
                template = TradingAccountTemplate.objects.get(id=template)
            else:
                return value

        if template and template.max_drawdown is not None:
            min_allowed_balance = template.account_size - template.max_drawdown

            if value < min_allowed_balance:
                raise serializers.ValidationError(
                    "Balance cannot be below template's the maximum drawdown limit"
                )

        return value

    def validate_account_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Account name cannot be empty")
        return value
