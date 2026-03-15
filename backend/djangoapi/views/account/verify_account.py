from secrets import token_urlsafe

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from backend.djangoapi.models.user import User
from backend.djangoapi.serializers.user import UserSerializer
from backend.djangoapi.tasks.user import send_welcome_email
from backend.djangoapi.utils.account import PostOnly


class VerifyAccountViewSet(viewsets.ViewSet):
    permission_classes = (PostOnly,)

    def create(self, request):

        token = request.data.get("token")

        try:
            user = User.objects.get(verification_token=token, is_verified=False)

            user.is_verified = True
            user.verification_token = None
            user.save()

            send_welcome_email.delay(user.email)

            return Response({"detail": "Verification complete."})

        except User.DoesNotExist:
            return Response(
                {
                    "error": "Email Verification link expired. Please create another email verification request."
                },
                status=status.HTTP_400_BAD_REQUEST,
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

            content = {"detail": "Email Verification request complete."}
            return Response(content)

        except User.DoesNotExist:
            return Response(
                {"error": "Email Verification request failed."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
