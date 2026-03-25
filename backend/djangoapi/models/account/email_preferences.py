from django.db import models


class EmailPreferences(models.Model):
    user = models.OneToOneField(
        "djangoapi.User",
        on_delete=models.CASCADE,
        related_name="email_preferences",
    )

    payout_reports = models.BooleanField(default=True)
    system_notifications = models.BooleanField(default=True)
    promotions = models.BooleanField(default=True)

    unsubscribe_all = models.BooleanField(default=False)

    updated_at = models.DateTimeField(auto_now=True)
