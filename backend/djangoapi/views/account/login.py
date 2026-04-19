import logging

from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.hashers import check_password
from django.utils import timezone
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.serializers import UserSerializer
from backend.djangoapi.services.demo.reset_demo_user import reset_demo_user
from backend.djangoapi.utils import visitor_ip_address

logger = logging.getLogger(__name__)
User = get_user_model()


class LogoutViewSet(APIView):
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        logger.info(
            "User logged out.",
            extra={"user_id": request.user.id},
        )
        logout(request)
        content = {
            "logged_in": False,
        }
        return Response(content)


class LoginViewSet(APIView):
    authentication_classes = (SessionAuthentication,)
    permission_classes = [AllowAny]

    def get(self, request):
        ip_data = visitor_ip_address(request)

        if str(self.request.user) != "AnonymousUser":
            user = User.objects.get(email=self.request.user)
            user.last_ip = ip_data["ip"] if ip_data["valid"] else None
            user.save()

            serializer = UserSerializer(user)
            content = {
                "user": serializer.data,
                "logged_in": True,
            }
            return Response(content)
        else:
            content = {
                "logged_in": False,
                "is_staff": False,
            }
            return Response(content)

    def post(self, request):
        email = request.data.get("email", None)
        password = request.data.get("password", None)
        ip_data = visitor_ip_address(request)

        user = request.user

        if not email or not password:
            logger.warning(
                "Login attempt with missing credentials.",
                extra={"email": email, "password_provided": bool(password)},
            )
            raise AuthenticationFailed("No credentials provided.")

        try:
            user = User.objects.get(email=email.lower())
        except User.DoesNotExist:
            logger.warning(
                "Login attempt with invalid email.",
                extra={"email": email},
            )
            raise AuthenticationFailed("Invalid username/password.")

        if not user.is_active:
            logger.warning(
                "Login attempt with inactive or deleted user.",
                extra={"email": email},
            )
            raise AuthenticationFailed("User inactive or deleted.")

        if user is None or not check_password(password, user.password):
            logger.warning(
                "Login attempt with invalid password.",
                extra={"email": email},
            )
            raise AuthenticationFailed("Invalid username/password.")
        else:
            login(request, user)

        user = request.user

        if user.is_demo:
            logger.info(
                "Resetting demo user after login.",
                extra={"user_id": user.id},
            )

            timezone_input = request.data.get("timezone")

            if timezone_input:
                user.timezone = timezone_input
                user.save(update_fields=["timezone"])

            reset_demo_user(user)

        user.last_login = timezone.now()
        user.last_ip = ip_data["ip"] if ip_data["valid"] else None
        user.save()

        logger.info(
            "User logged in successfully.",
            extra={"user_id": user.id},
        )

        serializer = UserSerializer(user)
        content = {
            "user": serializer.data,
            "logged_in": True,
        }
        return Response(content)
