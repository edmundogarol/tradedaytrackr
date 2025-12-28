from rest_framework import serializers
from backend.djangoapi.models.account.reset_password import ResetPasswordSession


class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResetPasswordSession
        fields = ("id", "user", "token", "created_date")
