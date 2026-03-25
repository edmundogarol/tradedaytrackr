from django.contrib.auth import get_user_model
from django.utils import timezone

from backend.djangoapi.models import Membership
from backend.djangoapi.tasks.user import (
    send_connect_account_email,
    send_membership_activated_email,
)

User = get_user_model()


def activate_membership_from_whop(data):
    email = data.get("email")
    email = email.lower()

    if not email:
        print("No email in webhook")
        return

    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        print(f"No user found with email: {email}")
        send_connect_account_email.delay(email)
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

    send_membership_activated_email.delay(email)

    print(f"Membership activated for {email}")
