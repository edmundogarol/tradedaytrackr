from rest_framework import serializers
from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.serializers.trading_day import TradingDaySerializer


class TradingAccountSerializer(serializers.ModelSerializer):
    accountSize = serializers.IntegerField(source="template.account_size")
    firm = serializers.CharField(source="template.firm")
    accountType = serializers.SerializerMethodField()

    profitTarget = serializers.DecimalField(
        source="template.profit_target",
        max_digits=10,
        decimal_places=2,
        required=False,
    )

    minBuffer = serializers.DecimalField(
        source="template.min_buffer",
        max_digits=10,
        decimal_places=2,
        required=False,
    )

    firmMinDays = serializers.IntegerField(
        source="template.min_trading_days", required=False
    )

    firmMinDayPnL = serializers.DecimalField(
        source="template.min_day_pnl",
        max_digits=10,
        decimal_places=2,
        required=False,
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
            "account_name",
            "account_balance",
            "accountSize",
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
