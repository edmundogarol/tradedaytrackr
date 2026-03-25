from django.contrib.auth import get_user_model
from django.utils import timezone

from backend.djangoapi.models import Membership

User = get_user_model()


def activate_membership_from_whop(data):
    email = data.get("email")
    whop_user_id = data.get("user_id")

    if not email:
        print("No email in webhook")
        return

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        print(f"No user found with email: {email}")
        return

    membership, _ = Membership.objects.get_or_create(user=user)

    membership.is_active = True
    membership.whop_user_id = whop_user_id
    membership.updated_at = timezone.now()
    membership.save()

    print(f"Membership activated for {email}")
