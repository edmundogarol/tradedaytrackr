import logging

from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from backend.djangoapi.models.account.email_preferences import EmailPreferences

logger = logging.getLogger(__name__)
User = get_user_model()


@receiver(post_save, sender=User)
def create_email_preferences(sender, instance, created, **kwargs):
    if created:
        try:
            EmailPreferences.objects.create(user=instance)

            logger.info(
                "Email preferences created for new user.",
                extra={"user_id": instance.id},
            )

        except Exception:
            logger.error(
                "Failed to create email preferences for new user.",
                exc_info=True,
                extra={"user_id": instance.id},
            )
            raise
