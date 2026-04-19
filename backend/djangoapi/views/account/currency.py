from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.serializers.user import UserCurrencySerializer
from backend.djangoapi.services.account.currency import fetch_usd_conversion_rate


class RefreshConversionRateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        currency = user.preferred_currency

        try:
            rate = fetch_usd_conversion_rate(currency)
        except Exception:
            return Response(
                {"detail": "Failed to fetch conversion rate"},
                status=500,
            )

        user.update_conversion_rate(rate)

        return Response(UserCurrencySerializer(user).data)


class UpdateCurrencyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        currency = request.data.get("currency")

        if not currency:
            return Response({"error": "Currency required"}, status=400)

        try:
            rate = fetch_usd_conversion_rate(currency)
        except Exception:
            return Response(
                {"error": "Failed to fetch conversion rate"},
                status=500,
            )

        user = request.user
        user.update_conversion_rate(rate)
        user.preferred_currency = currency
        user.save(update_fields=["preferred_currency"])

        return Response({"success": True})
