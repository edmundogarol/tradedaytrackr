import logging
from datetime import datetime
from secrets import token_urlsafe

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from django.utils import timezone
from rest_framework import exceptions

from backend.djangoapi.models import ResetPasswordSession
from backend.djangoapi.tasks.user import send_reset_password_email

logger = logging.getLogger(__name__)
User = get_user_model()


def is_expired(created_date, minutes):
    return (timezone.now() - created_date).total_seconds() > minutes * 60


def delete_all_unexpired_sessions_for_user(user):
    sessions = Session.objects.filter(expire_date__gte=timezone.now())

    for session in sessions:
        session_data = session.get_decoded()
        auth_user_id = session_data.get("_auth_user_id")

        if auth_user_id is None:
            logger.warning(
                "Session without auth user ID found. Skipping session deletion.",
                extra={"session_key": session.session_key},
            )
            continue

        if str(user.pk) == auth_user_id:
            session.delete()

    logger.info(
        "Deleted active sessions for user.",
        extra={"user_id": user.id},
    )


def create_password_reset(email):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        logger.warning(
            "Password reset requested for non-existent email.",
            extra={"email": email},
        )
        return

    token = token_urlsafe(20)

    reset_session, _ = ResetPasswordSession.objects.get_or_create(user=user)
    reset_session.token = token
    reset_session.verified_token = None
    reset_session.created_date = datetime.now()
    reset_session.save()

    reset_url = f"{settings.WEB_APP_URL}/confirmResetPassword?token={token}"

    try:
        send_reset_password_email(user.email, reset_url)
    except Exception:
        logger.error(
            "Failed to send password reset email.",
            exc_info=True,
            extra={"user_id": user.id},
        )


def verify_password_reset_token(token):
    try:
        session = ResetPasswordSession.objects.get(token=token)
    except ResetPasswordSession.DoesNotExist:
        logger.warning("Invalid password reset token provided.")
        raise exceptions.AuthenticationFailed("Invalid reset link")

    if is_expired(session.created_date, 20):
        session.delete()
        logger.warning("Password reset token expired.")
        raise exceptions.AuthenticationFailed("Reset link expired")

    session.verified_token = token_urlsafe(20)
    session.save()

    return session.verified_token


def submit_password_reset(token, password):
    try:
        session = ResetPasswordSession.objects.get(token=token)
    except ResetPasswordSession.DoesNotExist:
        logger.warning("Invalid password reset token provided.")
        raise exceptions.AuthenticationFailed("Invalid token")

    if is_expired(session.created_date, 5):
        session.delete()
        logger.warning("Password reset token expired.")
        raise exceptions.AuthenticationFailed("Token expired")

    user = session.user

    delete_all_unexpired_sessions_for_user(user)
    session.delete()

    if not user.is_verified:
        user.is_verified = True

    user.set_password(password)
    user.save()

    logger.info(
        "Password reset completed.",
        extra={"user_id": user.id},
    )
