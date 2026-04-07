from rest_framework import serializers

from backend.djangoapi.models import TradingAccountTemplate


class TradingAccountTemplateSerializer(serializers.ModelSerializer):
    display_image = serializers.SerializerMethodField()

    class Meta:
        model = TradingAccountTemplate
        fields = [
            "id",
            "name",
            "firm",
            "account_size",
            "is_evaluation",
            "icon",
            "image",
            "display_image",
            "profit_target",
            "profit_split",
            "min_buffer",
            "min_trading_days",
            "min_day_pnl",
            "max_drawdown",
            "consistency",
            "allowable_payout_request",
        ]
        read_only_fields = ["id"]
        extra_kwargs = {
            "name": {"required": False},
            "firm": {"required": False},
            "account_size": {"required": False},
            "max_drawdown": {"required": False},
            "is_evaluation": {"required": False},
        }

    def get_display_image(self, obj):
        # priority: uploaded image > icon > fallback
        request = self.context.get("request")

        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url

        if obj.icon:
            return f"/images/firms/{obj.icon}.png"

        return "/static/icons/default.png"

    def validate_account_size(self, value):
        if value <= 0:
            raise serializers.ValidationError("Account size must be positive")
        return value

    def validate_min_trading_days(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Minimum trading days cannot be negative")
        return value

    def validate_profit_split(self, value):
        if value is not None and (value < 0 or value > 100):
            raise serializers.ValidationError("Profit split must be between 0 and 100")
        return value

    def validate_consistency(self, value):
        if value is not None and (value < 0 or value > 100):
            raise serializers.ValidationError("Consistency must be between 0 and 100")
        return value

    def validate_allowable_payout_request(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Allowable payout must be positive")
        return value

    def validate_max_drawdown(self, value):
        if value <= 0:
            raise serializers.ValidationError("Max drawdown must be positive")
        return value

    def validate(self, data):
        errors = {}

        def get_value(field):
            return data.get(field, getattr(self.instance, field, None))

        user = self.context["request"].user
        name = get_value("name")

        if name:
            qs = TradingAccountTemplate.objects.filter(user=user, name=name)

            # exclude self if updating
            if self.instance:
                qs = qs.exclude(id=self.instance.id)

            if qs.exists():
                errors["name"] = "You already have a template with this name."

        base_required = ["name", "firm", "account_size", "max_drawdown"]

        for field in base_required:
            if get_value(field) in [None, ""]:
                errors[field] = "This field is required."

        is_eval = get_value("is_evaluation")

        if get_value("max_drawdown") in [None, ""]:
            errors["max_drawdown"] = "This field is required."

        if is_eval is True:
            required_fields = [
                "profit_target",
                "consistency",
            ]
        else:
            required_fields = [
                "profit_split",
                "min_buffer",
                "min_trading_days",
                "min_day_pnl",
                "allowable_payout_request",
            ]

        for field in required_fields:
            value = get_value(field)

            if value in [None, ""]:
                errors[field] = "This field is required."

        if errors:
            raise serializers.ValidationError(errors)

        return data
