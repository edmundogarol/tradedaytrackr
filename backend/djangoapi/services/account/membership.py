import logging

from django.contrib.auth import get_user_model
from django.utils import timezone

from backend.djangoapi.models import Membership
from backend.djangoapi.tasks.user import (
    send_connect_account_email,
    send_membership_activated_email,
    send_membership_cancelled_email,
)

logger = logging.getLogger(__name__)
User = get_user_model()


def activate_membership_from_whop(data):
    email = data.get("email")

    if not email:
        logger.error("No email provided in Whop webhook data.")
        return

    email = email.lower()

    logger.info(
        "Processing membership activation webhook.",
        extra={"email": email, "membership_id": data.get("id")},
    )

    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        logger.warning(
            "No user found for membership activation. Sending connect email.",
            extra={"email": email},
        )

        try:
            send_connect_account_email(email)
        except Exception:
            logger.error(
                "Failed to send connect account email.",
                exc_info=True,
                extra={"email": email},
            )

        return

    membership_id = data.get("id")

    membership, _ = Membership.objects.get_or_create(
        user=user,
        defaults={
            "whop_membership_id": membership_id,
            "status": data.get("status", "active"),
        },
    )

    membership.whop_membership_id = membership_id
    membership.status = data.get("status", "active")
    membership.is_active = True
    membership.updated_at = timezone.now()
    membership.save()

    try:
        send_membership_activated_email(email)
    except Exception:
        logger.error(
            "Failed to send membership activated email.",
            exc_info=True,
            extra={"email": email},
        )

    logger.info(
        "Membership activated.",
        extra={"user_id": user.id, "membership_id": membership.id},
    )


def cancel_membership_from_whop(data):
    email = data.get("email")

    if not email:
        logger.error("No email provided in Whop webhook data.")
        return

    email = email.lower()

    logger.info(
        "Processing membership cancellation webhook.",
        extra={"email": email, "membership_id": data.get("id")},
    )

    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        logger.warning(
            "No user found for membership cancellation.",
            extra={"email": email},
        )
        return

    membership_id = data.get("id")
    membership = Membership.objects.filter(user=user).first()

    if not membership:
        logger.warning(
            "No membership found for user during cancellation.",
            extra={"email": email},
        )
        return

    if membership_id and membership.whop_membership_id != membership_id:
        logger.warning(
            "Membership ID mismatch during cancellation.",
            extra={
                "email": email,
                "expected": membership.whop_membership_id,
                "received": membership_id,
            },
        )
        return

    membership.status = data.get("status", "cancelled")
    membership.is_active = False
    membership.updated_at = timezone.now()
    membership.save()

    try:
        send_membership_cancelled_email(email)
    except Exception:
        logger.error(
            "Failed to send membership cancelled email.",
            exc_info=True,
            extra={"email": email},
        )

    logger.info(
        "Membership cancelled.",
        extra={"user_id": user.id, "membership_id": membership.id},
    )
