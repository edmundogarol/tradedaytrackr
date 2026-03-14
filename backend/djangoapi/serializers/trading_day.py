from rest_framework import serializers
from backend.djangoapi.models.trading_day import TradingDay


class TradingDaySerializer(serializers.ModelSerializer):
    day = serializers.IntegerField(source="day_number")
    pnl = serializers.DecimalField(source="pnl", max_digits=10, decimal_places=2)
    entry_time = serializers.TimeField(source="entry_time")

    class Meta:
        model = TradingDay
        fields = [
            "id",
            "day",
            "pnl",
            "entry_time",
            "date",
            "image",
        ]
