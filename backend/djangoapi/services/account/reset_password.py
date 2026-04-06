import hashlib
import logging
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


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def delete_all_unexpired_sessions_for_user(user):
    sessions = Session.objects.filter(expire_date__gte=timezone.now())

    for session in sessions:
        session_data = session.get_decoded()
        auth_user_id = session_data.get("_auth_user_id")

        if not auth_user_id:
            continue

        if str(user.pk) == auth_user_id:
            session.delete()

    logger.info("Deleted active sessions for user.", extra={"user_id": user.id})


def create_password_reset(email):
    user = User.objects.filter(email=email).first()

    # Prevent email enumeration
    if not user:
        logger.info(
            "Password reset requested for non-existent email.", extra={"email": email}
        )
        return

    raw_token = token_urlsafe(32)
    token_hash = hash_token(raw_token)

    # Delete old sessions (optional but clean)
    ResetPasswordSession.objects.filter(user=user).delete()

    reset_session = ResetPasswordSession.objects.create(
        user=user,
        token_hash=token_hash,
    )

    reset_url = f"{settings.WEB_APP_URL}/confirmResetPassword?token={raw_token}"

    try:
        send_reset_password_email(user.email, reset_url)
    except Exception:
        logger.error(
            "Failed to send password reset email.",
            exc_info=True,
            extra={"user_id": user.id},
        )


def verify_password_reset_token(token):
    token_hash = hash_token(token)

    try:
        session = ResetPasswordSession.objects.get(token_hash=token_hash)
    except ResetPasswordSession.DoesNotExist:
        logger.warning("Invalid password reset token.")
        raise exceptions.AuthenticationFailed("Invalid or expired token")

    if session.is_used or session.is_expired():
        session.delete()
        logger.warning("Expired or already used token.")
        raise exceptions.AuthenticationFailed("Invalid or expired token")

    # No token rotation anymore — just validation
    return True


# =========================
# Submit Reset
# =========================


def submit_password_reset(token, password):
    token_hash = hash_token(token)

    try:
        session = ResetPasswordSession.objects.get(token_hash=token_hash)
    except ResetPasswordSession.DoesNotExist:
        logger.warning("Invalid password reset token.")
        raise exceptions.AuthenticationFailed("Invalid or expired token")

    if session.is_used or session.is_expired():
        session.delete()
        logger.warning("Expired or already used token.")
        raise exceptions.AuthenticationFailed("Invalid or expired token")

    user = session.user

    # Invalidate all active sessions (force logout everywhere)
    delete_all_unexpired_sessions_for_user(user)

    # Update password
    user.set_password(password)

    if not user.is_verified:
        user.is_verified = True

    user.save()

    # Mark token as used (instead of delete for audit/debugging)
    session.is_used = True
    session.save()

    logger.info("Password reset completed.", extra={"user_id": user.id})
