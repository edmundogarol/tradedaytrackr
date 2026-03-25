from datetime import timedelta
from secrets import token_urlsafe

from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.djangoapi.tasks.user import send_verification_email, send_welcome_email
from backend.djangoapi.utils.account import PostOnly

User = get_user_model()


class VerifyAccountViewSet(viewsets.ViewSet):
    permission_classes = (PostOnly,)

    def create(self, request):
        token = request.data.get("token")

        if not token:
            return Response(
                {"error": "Verification token required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(
                verification_token=token,
                is_verified=False,
            )

            # 🔐 Expiry check (24h)
            if user.verification_sent_at and (
                timezone.now() - user.verification_sent_at > timedelta(hours=24)
            ):
                return Response(
                    {"error": "Verification link expired."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user.is_verified = True
            user.verification_token = None
            user.verification_sent_at = None
            user.save()

            send_welcome_email.delay(user.email)

            return Response({"detail": "Verification complete."})

        except User.DoesNotExist:
            return Response(
                {"error": "Invalid or expired verification link."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RequestVerificationViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def create(self, request):

        user = request.user

        if user.is_verified:
            return Response(
                {"detail": "User already verified."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # generate new token
        user.verification_token = token_urlsafe(32)
        user.verification_sent_at = timezone.now()
        user.save()

        verification_url = f"{settings.WEB_APP_URL}/dashboard?verification_token={user.verification_token}"

        send_verification_email.delay(user.email, verification_url)

        return Response({"detail": "Verification email sent."})
