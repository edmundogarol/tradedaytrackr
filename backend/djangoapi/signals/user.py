from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from backend.djangoapi.models.account.email_preferences import EmailPreferences

User = get_user_model()


@receiver(post_save, sender=User)
def create_email_preferences(sender, instance, created, **kwargs):
    if created:
        print("Signal triggered to create email preferences for user creation.")
        EmailPreferences.objects.create(user=instance)
