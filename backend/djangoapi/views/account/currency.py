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
