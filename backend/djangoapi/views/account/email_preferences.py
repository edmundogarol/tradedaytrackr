from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.serializers.account.email_preferences import (
    EmailPreferencesSerializer,
)


class EmailPreferencesView(APIView):
    def patch(self, request):
        prefs = request.user.email_preferences

        serializer = EmailPreferencesSerializer(prefs, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
