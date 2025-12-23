from rest_framework import serializers

from backend.djangoapi.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "username",
            "birth_date",
            "is_staff",
            # "readable_date_joined",
            "last_login",
            # "readable_last_login",
            "verified",
            "last_ip",
        )