from django.db.models import Sum
from rest_framework import serializers

from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.models.trading_account_template import TradingAccountTemplate
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

    min_payout_request = serializers.DecimalField(
        source="template.min_payout_request",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    max_payout_request = serializers.DecimalField(
        source="template.max_payout_request",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    withdrawal_split = serializers.DecimalField(
        source="template.withdrawal_split",
        max_digits=5,
        decimal_places=2,
        read_only=True,
    )

    day_values = serializers.SerializerMethodField()
    buffer_percent = serializers.SerializerMethodField()
    current_day_count = serializers.SerializerMethodField()
    post_payout_buffer = serializers.SerializerMethodField()
    withdrawable_amount = serializers.SerializerMethodField()
    consistency_score = serializers.SerializerMethodField()
    consistency = serializers.DecimalField(
        source="template.consistency",
        max_digits=5,
        decimal_places=2,
        read_only=True,
    )
    name = serializers.SerializerMethodField(source="account_name", read_only=True)

    class Meta:
        model = TradingAccount
        fields = [
            "id",
            "name",
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
            "min_payout_request",
            "max_payout_request",
            "withdrawal_split",
            "post_payout_buffer",
            "withdrawable_amount",
            "consistency_score",
            "consistency",
            "is_archived",
        ]
        extra_kwargs = {
            "account_balance": {"required": False},
        }

    def get_name(self, obj):
        return obj.account_name

    def get_day_values(self, obj):
        latest_days = (
            obj.trading_days.all().order_by("-date").prefetch_related("trades")[:5]
        )
        return TradingDaySerializer(latest_days, many=True, context=self.context).data

    def get_image(self, obj):
        request = self.context.get("request")

        url = None

        if obj.template and obj.template.image:
            url = obj.template.image.url

        elif obj.template and obj.template.icon:
            url = f"/images/firms/{obj.template.icon}.png"

        if "firms" not in url:
            absolute_url = request.build_absolute_uri(url)

            return absolute_url

        return url

    def get_account_type(self, obj):
        return {
            "id": obj.template.id,
            "name": obj.template.name,
            "is_eval": obj.template.is_evaluation,
            "firm": obj.template.firm,
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

        min_req = template.min_payout_request or 0
        max_req = template.max_payout_request

        has_static_rule = template.rules.filter(
            name="MFFU $100 MLL after Payout #1"
        ).exists()

        # STATIC RULE
        if has_static_rule:
            floor = 50100

            # HARD CONSTRAINT
            max_safe = balance - floor

            if max_safe <= 0:
                return 0

            # APPLY SPLIT (ON SAFE AMOUNT)
            if template.withdrawal_split:
                max_safe = (max_safe * template.withdrawal_split) / 100

            # APPLY MAX CAP
            if template.max_payout_request:
                max_safe = min(max_safe, template.max_payout_request)

            # APPLY MIN REQUIREMENT
            if max_safe < (template.min_payout_request or 0):
                return 0

            return round(max_safe, 2)

        account_size = template.account_size
        min_buffer = template.min_buffer or 0
        min_req = template.min_payout_request or 0
        max_req = template.max_payout_request
        split = template.withdrawal_split

        profit = balance - account_size

        if profit <= 0:
            return 0

        # constraint 1: withdrawal split
        max_by_split = profit
        if split or split != 0:
            max_by_split = (profit * split) / 100

        # constraint 2: buffer
        max_by_buffer = balance - (account_size + min_buffer)

        # final available = stricter constraint
        available = min(max_by_split, max_by_buffer)

        if available <= 0:
            return 0

        if available < min_req:
            return 0

        if max_req:
            available = min(available, max_req)

        return round(available, 2)

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

        # NORMAL
        account_size = template.account_size

        profit = balance - account_size
        remaining_profit = profit - withdrawable

        return round(max(remaining_profit, 0), 2)

    def get_consistency_score(self, obj):
        days = obj.trading_days.annotate(pnl=Sum("trades__pnl"))
        pnls = [day.pnl for day in days if day.pnl is not None]

        if not pnls:
            return 0

        total_profit = sum(pnls)
        if total_profit == 0:
            return 0

        largest_day = max(pnls)
        score = (largest_day / total_profit) * 100

        return round(score, 2)

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
