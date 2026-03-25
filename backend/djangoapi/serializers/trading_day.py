from rest_framework import serializers

from backend.djangoapi.models import TradingDay


class TradingDaySerializer(serializers.ModelSerializer):
    day = serializers.IntegerField(source="day_number")

    class Meta:
        model = TradingDay
        fields = [
            "id",
            "account",
            "day",
            "date",
            "created_at",
        ]
