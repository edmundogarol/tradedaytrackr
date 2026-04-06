import logging

from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.account.email_preferences import EmailPreferences
from backend.djangoapi.serializers.account.email_preferences import (
    EmailPreferencesSerializer,
)

logger = logging.getLogger(__name__)


class EmailPreferencesView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        if request.user.is_demo:
            logger.warning(
                "Demo user attempted to update email preferences.",
                extra={"user_id": request.user.id},
            )
            return Response(
                {"error": "Demo accounts cannot update email preferences"},
                status=403,
            )

        user = request.user

        prefs, _ = EmailPreferences.objects.get_or_create(user=user)

        data = request.data

        # ✅ If unsubscribe_all explicitly turned ON
        if data.get("unsubscribe_all") is True:
            prefs.unsubscribe_all = True
            prefs.payout_reports = False
            prefs.system_notifications = False
            prefs.promotional_offers = False
            prefs.updated_at = timezone.now()
            prefs.save()

            logger.info(
                "Email preferences updated.",
                extra={"user_id": request.user.id},
            )

            return Response(EmailPreferencesSerializer(prefs).data)

        # ✅ If any preference is turned ON → disable unsubscribe_all
        should_disable_unsubscribe = any(
            [
                data.get("payout_reports") is True,
                data.get("system_notifications") is True,
                data.get("promotional_offers") is True,
            ]
        )

        serializer = EmailPreferencesSerializer(prefs, data=data, partial=True)
        serializer.is_valid(raise_exception=True)

        updated_prefs = serializer.save(
            unsubscribe_all=False
            if should_disable_unsubscribe
            else prefs.unsubscribe_all,
            updated_at=timezone.now(),
        )

        logger.info(
            "Email preferences updated.",
            extra={"user_id": request.user.id},
        )

        return Response(EmailPreferencesSerializer(updated_prefs).data)
