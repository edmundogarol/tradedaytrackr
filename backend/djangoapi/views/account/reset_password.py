from django.contrib.auth import password_validation
from django.core.validators import validate_email
from rest_framework import exceptions, viewsets
from rest_framework.response import Response

from backend.djangoapi.services.account.reset_password import (
    create_password_reset,
    submit_password_reset,
    verify_password_reset_token,
)


class RequestPasswordResetViewSet(viewsets.ViewSet):
    def create(self, request):
        email = request.data.get("email")

        if not email:
            raise exceptions.ValidationError({"error": "Missing Email field."})

        validate_email(email)

        create_password_reset(email.lower())

        return Response(status=200)


class VerifyPasswordResetViewSet(viewsets.ViewSet):
    def create(self, request):
        token = request.data.get("token")

        verified_token = verify_password_reset_token(token)

        return Response({"verified_token": verified_token})


class SubmitPasswordResetViewSet(viewsets.ViewSet):
    def create(self, request):
        password = request.data.get("password")
        confirm = request.data.get("confirm_password")
        token = request.data.get("token")

        if password != confirm:
            raise exceptions.ValidationError("Passwords must match")

        password_validation.validate_password(password)

        submit_password_reset(token, password)

        return Response(status=200)
