from rest_framework import serializers
from django.contrib.auth import password_validation
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.conf import settings
from secrets import token_urlsafe

from backend.djangoapi.models import User
from backend.djangoapi.tasks.user import send_verification_email


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
            "last_login",
            "is_verified",
            "verification_sent_at",
            "verification_token",
            "last_ip",
        )


class UserValidationSerializer(serializers.ModelSerializer):

    def validate_email(self, value):
        value = value.lower()

        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format.")

        qs = User.objects.filter(email=value)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise serializers.ValidationError("User with this email already exists.")

        return value

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value


class RegisterSerializer(UserValidationSerializer):

    class Meta:
        model = User
        fields = ["email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):

        request = self.context.get("request")
        ip = request.META.get("REMOTE_ADDR") if request else None

        user = User.objects.create_user(**validated_data)

        user.last_ip = ip
        user.is_verified = False
        user.verification_token = token_urlsafe(32)
        user.verification_sent_at = timezone.now()
        user.save()

        verification_url = (
            f"{settings.WEB_API_URL}/?verification_token={user.verification_token}"
        )

        send_verification_email.delay(user.email, verification_url)

        return user


class UpdateUserSerializer(UserValidationSerializer):

    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": False}}

    def validate_username(self, value):

        qs = User.objects.filter(username=value)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if value and qs.exists():
            raise serializers.ValidationError("User with this username already exists.")

        return value

    def update(self, instance, validated_data):

        email_changed = "email" in validated_data
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        if email_changed:
            instance.is_verified = False

        instance.save()

        return instance
