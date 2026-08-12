from rest_framework import serializers

from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.models.trading_account_template import TradingAccountTemplate
from backend.djangoapi.serializers.trading_day import TradingDaySerializer
from backend.djangoapi.services.trades.account_balance import recompute_account_balance


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
    day_values_next_page = serializers.SerializerMethodField()
    day_values_count = serializers.SerializerMethodField()
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
            "day_values_next_page",
            "day_values_count",
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
            "account_balance": {"read_only": True},
        }

    def get_name(self, obj):
        return obj.account_name

    def _get_days_qs(self, obj):
        if not hasattr(self, "_days_qs_cache"):
            self._days_qs_cache = {}

        if obj.id not in self._days_qs_cache:
            qs = obj.trading_days.all().order_by("-date").prefetch_related("trades")

            count = qs.count()

            self._days_qs_cache[obj.id] = qs
            self._day_values_count_map = getattr(self, "_day_values_count_map", {})
            self._day_values_has_next_map = getattr(
                self, "_day_values_has_next_map", {}
            )

            self._day_values_count_map[obj.id] = count
            self._day_values_has_next_map[obj.id] = count > 5

        return self._days_qs_cache[obj.id]

    def get_day_values(self, obj):
        qs = self._get_days_qs(obj)
        return TradingDaySerializer(qs[:5], many=True, context=self.context).data

    def get_day_values_count(self, obj):
        self._get_days_qs(obj)
        return self._day_values_count_map.get(obj.id, 0)

    def get_day_values_next_page(self, obj):
        self._get_days_qs(obj)
        if self._day_values_has_next_map.get(obj.id, False):
            return f"/api/trading-days/?account_id={obj.id}&page=2"
        return None

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
        return obj.get_buffer_percent()

    def get_withdrawable_amount(self, obj):
        return obj.get_withdrawable_amount()

    def get_post_payout_buffer(self, obj):
        return obj.get_post_payout_buffer()

    def get_consistency_score(self, obj):
        return round(obj.get_consistency_score(), 2)

    def get_current_day_count(self, obj):
        return obj.get_current_day_count()

    def validate_baseline_balance(self, value):
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

    def update(self, instance, validated_data):
        # account_balance is derived (baseline_balance + trades - payouts) and
        # recomputed by the Trade post_save/post_delete signal, so it must
        # never be written here directly — doing so would only "stick" until
        # the next trade save silently reverts it. Edits to the account's
        # balance go through baseline_balance instead, then we recompute so
        # the displayed account_balance reflects the change immediately.
        validated_data.pop("account_balance", None)

        account = super().update(instance, validated_data)

        if "baseline_balance" in validated_data:
            recompute_account_balance(account)
            account.refresh_from_db()

        return account
