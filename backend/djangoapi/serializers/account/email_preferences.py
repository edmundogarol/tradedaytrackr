from rest_framework import serializers

from backend.djangoapi.models.account.email_preferences import EmailPreferences


class EmailPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailPreferences
        fields = [
            "payout_reports",
            "system_notifications",
            "promotional_offers",
            "unsubscribe_all",
        ]
