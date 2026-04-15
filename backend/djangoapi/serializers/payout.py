import pytz
from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models.payout import Payout


class PayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payout
        fields = [
            "id",
            "account",
            "amount",
            "payout_date",
            "balance_before",
            "balance_after",
            "created_at",
        ]


class PayoutListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payout
        fields = [
            "id",
            "amount",
            "payout_date",
        ]


class PayoutCreateSerializer(serializers.ModelSerializer):
    payout_date = serializers.DateTimeField(required=False)

    class Meta:
        model = Payout
        fields = ["account", "amount", "payout_date"]

    def validate(self, data):
        request = self.context.get("request")
        user = request.user
        user_tz = pytz.timezone(user.timezone)

        payout_date = data.get("payout_date")

        if payout_date:
            if timezone.is_naive(payout_date):
                payout_date = user_tz.localize(payout_date)

            data["payout_date"] = payout_date.astimezone(pytz.UTC)
        else:
            # fallback to now
            local_now = timezone.now().astimezone(user_tz)
            data["payout_date"] = local_now.astimezone(pytz.UTC)

        return data
