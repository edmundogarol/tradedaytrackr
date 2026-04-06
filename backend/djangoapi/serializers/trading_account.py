from rest_framework import serializers

from backend.djangoapi.models import TradingAccount, TradingAccountTemplate
from backend.djangoapi.serializers.trading_day import TradingDaySerializer


class TradingAccountSerializer(serializers.ModelSerializer):
    template_id = serializers.PrimaryKeyRelatedField(
        queryset=TradingAccountTemplate.objects.all(),
        source="template",
        write_only=True,
    )
    accountSize = serializers.IntegerField(
        source="template.account_size", read_only=True, default=0
    )
    firm = serializers.CharField(source="template.firm", read_only=True)
    accountType = serializers.SerializerMethodField()
    image = serializers.CharField(source="template.image", read_only=True)
    profitTarget = serializers.DecimalField(
        source="template.profit_target",
        max_digits=10,
        decimal_places=2,
        required=False,
        read_only=True,
    )

    minBuffer = serializers.DecimalField(
        source="template.min_buffer",
        max_digits=10,
        decimal_places=2,
        required=False,
        read_only=True,
    )

    firmMinDays = serializers.IntegerField(
        source="template.min_trading_days", required=False, read_only=True
    )

    firmMinDayPnL = serializers.DecimalField(
        source="template.min_day_pnl",
        max_digits=10,
        decimal_places=2,
        required=False,
        read_only=True,
    )

    dayValues = TradingDaySerializer(
        source="trading_days",
        many=True,
        read_only=True,
    )

    class Meta:
        model = TradingAccount
        fields = [
            "id",
            "template_id",
            "account_name",
            "account_balance",
            "accountSize",
            "image",
            "firm",
            "accountType",
            "profitTarget",
            "minBuffer",
            "firmMinDays",
            "firmMinDayPnL",
            "dayValues",
        ]

    def get_accountType(self, obj):
        return {
            "id": obj.template.id,
            "name": obj.template.name,
        }

    def validate_account_balance(self, value):
        if value < 0:
            raise serializers.ValidationError("Balance cannot be negative")
        return value

    def validate_account_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Account name cannot be empty")
        return value
