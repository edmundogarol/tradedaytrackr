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

    baseline_balance = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
        write_only=True,
        required=False,
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

    allowable_payout_request = serializers.DecimalField(
        source="template.allowable_payout_request",
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
    post_payout_buffer = serializers.SerializerMethodField()
    withdrawable_amount = serializers.SerializerMethodField()

    class Meta:
        model = TradingAccount
        fields = [
            "id",
            "account_name",
            "account_balance",
            "baseline_balance",
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
            "allowable_payout_request",
            "post_payout_buffer",
            "withdrawable_amount",
        ]

    def get_image(self, obj):
        request = self.context.get("request")

        url = None

        if obj.template and obj.template.image:
            url = obj.template.image.url

        elif obj.template and obj.template.icon:
            url = f"/images/firms/{obj.template.icon}.png"

        if "firms" not in url:
            absolute_url = request.build_absolute_uri(url)

            if "DEVENV" in os.environ:
                return absolute_url.replace(
                    "http://localhost:8000", "http://localhost:3000"
                )

            return absolute_url

        return url

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
        day_numbers = obj.trading_days.filter(is_valid_day=True).values_list(
            "day_number", flat=True
        )

        return max((d for d in day_numbers if d is not None), default=0)

    def get_withdrawable_amount(self, obj):
        template = obj.template
        balance = obj.account_balance

        has_static_rule = template.rules.filter(
            name="MFFU $100 MLL after Payout #1"
        ).exists()

        # 🔥 STATIC RULE (FIXED)
        if has_static_rule:
            floor = 50100
            cushion = 100

            max_safe = balance - (floor + cushion)

            if max_safe <= 0:
                return 0

            cap = template.allowable_payout_request or max_safe

            return round(min(max_safe, cap), 2)

        # 🔥 NORMAL LOGIC (unchanged)
        account_size = template.account_size
        min_buffer = template.min_buffer or 0
        cap = template.allowable_payout_request or 0

        profit = balance - account_size
        available = profit - min_buffer

        if available <= 0:
            return 0

        return round(min(available, cap), 2)

    def get_post_payout_buffer(self, obj):
        template = obj.template
        balance = obj.account_balance

        withdrawable = self.get_withdrawable_amount(obj)

        has_static_rule = template.rules.filter(
            name="MFFU $100 MLL after Payout #1"
        ).exists()

        if has_static_rule:
            floor = 50100
            post_balance = balance - withdrawable

            buffer_after = post_balance - floor

            return round(max(buffer_after, 0), 2)

        # 🔥 NORMAL
        account_size = template.account_size

        profit = balance - account_size
        remaining_profit = profit - withdrawable

        return round(max(remaining_profit, 0), 2)

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
                    "Balance cannot be below template's maximum drawdown limit"
                )

        return value

    def validate_account_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Account name cannot be empty")
        return value

    def create(self, validated_data):
        template = validated_data["template"]

        baseline = validated_data.pop("baseline_balance", template.account_size)

        account = TradingAccount.objects.create(
            baseline_balance=baseline,
            account_balance=baseline,
            **validated_data,
        )

        return account
