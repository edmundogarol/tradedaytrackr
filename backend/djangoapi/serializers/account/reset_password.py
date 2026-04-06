from rest_framework import serializers

from backend.djangoapi.models import ResetPasswordSession


class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResetPasswordSession
        fields = ("id", "created_date")
        read_only_fields = ("id", "created_date")
