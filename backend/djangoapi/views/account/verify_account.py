from smtplib import SMTPAuthenticationError
from secrets import token_urlsafe
from threading import Thread

from django.core.mail import send_mail
from django.template.loader import render_to_string

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from backend.djangoapi.models.user import User
from backend.djangoapi.serializers.user import UserSerializer
from backend.djangoapi.utils.account import PostOnly


def send_account_verification_email(user, token):
    email_template_name = "emails/verify_account.html"

    email_config = {
        "email": user.email,
        "website": "https://tradedaytrackr.com",
        "user": user,
        "token": token,
    }

    try:
        email = render_to_string(email_template_name, email_config)

        send_mail(
            subject="Verify Email for TradeDayTrackR Account",
            message="Please use an HTML compatible email viewer!",
            from_email="TradeDayTrackR<info@tradedaytrackr.com>",
            recipient_list=[user.email],
            fail_silently=False,
            html_message=email,
        )

    except SMTPAuthenticationError:
        print("Username and Password not accepted for smtp email config.")


class VerifyAccountViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (PostOnly,)

    @action(detail=False, methods=["post"], url_path="email")
    def email(self, request, *args, **kwargs):
        data = request.data
        token = data["token"]

        try:
            user = User.objects.get(verified=token)
            user.verified = "verified"
            user.save()

            content = {"detail": "Verification complete."}
            return Response(content)

        except User.DoesNotExist:
            return Response(
                {
                    "error": "Email Verification link expired. Please create another email verification request."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )


class RequestVerificationViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=["post"], url_path="email")
    def email(self, request, *args, **kwargs):

        try:
            user = User.objects.get(email=self.request.user)

            user.verified = token_urlsafe(20)
            user.save()

            Thread(
                target=send_account_verification_email,
                args=(
                    user,
                    user.verified,
                ),
            ).start()

            content = {"detail": "Email Verification request complete."}
            return Response(content)

        except User.DoesNotExist:
            return Response(
                {"error": "Email Verification request failed."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
