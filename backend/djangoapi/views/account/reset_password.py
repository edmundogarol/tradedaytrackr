import logging

from django.contrib.auth import password_validation
from django.core.validators import validate_email
from rest_framework import exceptions, viewsets
from rest_framework.response import Response

from backend.djangoapi.services.account.reset_password import (
    create_password_reset,
    submit_password_reset,
    verify_password_reset_token,
)

logger = logging.getLogger(__name__)


class RequestPasswordResetViewSet(viewsets.ViewSet):
    def create(self, request):
        email = request.data.get("email")

        if not email:
            logger.warning("Password reset request with missing email.")
            raise exceptions.ValidationError({"error": "Missing Email field."})

        try:
            validate_email(email)
        except Exception:
            logger.warning(
                "Password reset request with invalid email format.",
                extra={"email": email},
            )
            raise exceptions.ValidationError({"error": "Invalid email address."})

        try:
            create_password_reset(email.lower())
        except Exception:
            logger.error(
                "Error during password reset process.",
                exc_info=True,
                extra={"email": email},
            )
            raise exceptions.APIException(
                "An error occurred while processing the password reset request."
            )

        logger.info(
            "Password reset process initiated.",
            extra={"email": email},
        )
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
            logger.warning("Password reset submission with mismatched passwords.")
            raise exceptions.ValidationError("Passwords must match")

        password_validation.validate_password(password)

        try:
            submit_password_reset(token, password)
        except Exception:
            logger.error(
                "Error during password reset submission.",
                exc_info=True,
            )
            raise exceptions.APIException(
                "An error occurred while resetting the password."
            )

        logger.info("Password reset submitted successfully.")
        return Response(status=200)
