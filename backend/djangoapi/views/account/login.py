import datetime

from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.hashers import check_password
from django.db import transaction
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.serializers import UserSerializer
from backend.djangoapi.utils import visitor_ip_address

User = get_user_model()


def reset_demo_user(user):
    with transaction.atomic():
        user.journal_entries.all().delete()
        user.trading_accounts.all().delete()

        # create_demo_data(user)


class LogoutViewSet(APIView):
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
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

        user = request.user

        if user.is_authenticated and user.is_demo:
            reset_demo_user(user)

        email = request.data.get("email", None)
        password = request.data.get("password", None)
        ip_data = visitor_ip_address(request)

        if not email or not password:
            raise AuthenticationFailed("No credentials provided.")

        try:
            user = User.objects.get(email=email.lower())
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid username/password.")

        if not user.is_active:
            raise AuthenticationFailed("User inactive or deleted.")

        if user is None or not check_password(password, user.password):
            raise AuthenticationFailed("Invalid username/password.")
        else:
            login(request, user)

        user = User.objects.get(email=self.request.user)
        user.last_login = datetime.datetime.now()
        user.last_ip = ip_data["ip"] if ip_data["valid"] else None
        user.save()

        serializer = UserSerializer(user)
        content = {
            "user": serializer.data,
            "logged_in": True,
        }
        return Response(content)
