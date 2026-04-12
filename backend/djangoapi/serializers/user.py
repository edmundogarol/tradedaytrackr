import logging
from secrets import token_urlsafe

from django.conf import settings
from django.contrib.auth import get_user_model, password_validation
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils import timezone
from rest_framework import serializers

from backend.djangoapi.models.account.membership import Membership
from backend.djangoapi.serializers.account.email_preferences import (
    EmailPreferencesSerializer,
)
from backend.djangoapi.tasks.user import send_verification_email

logger = logging.getLogger(__name__)
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    membership_active = serializers.SerializerMethodField()
    email_preferences = EmailPreferencesSerializer(read_only=True)

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
            "last_ip",
            "membership_active",
            "email_preferences",
            "is_demo",
            "timezone",
        )

    def get_membership_active(self, obj):
        try:
            return obj.membership.is_active
        except Membership.DoesNotExist:
            return False


class UserValidationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[])

    def validate_email(self, value):
        value = value.lower()

        try:
            validate_email(value)
        except ValidationError:
            logger.warning(
                "Invalid email format.",
                extra={"email": value},
            )
            raise serializers.ValidationError("Invalid email format.")

        qs = User.objects.filter(email=value)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            logger.warning(
                "Email address already in use.",
                extra={"email": value},
            )
            raise serializers.ValidationError("User with this email already exists.")

        return value

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def validate_first_name(self, value):
        if value is not None and len(value.strip()) == 0:
            logger.warning(
                "First name cannot be empty.",
                extra={"first_name": value},
            )
            raise serializers.ValidationError("First name cannot be empty.")
        return value.strip() if value else value

    def validate_last_name(self, value):
        if value is not None and len(value.strip()) == 0:
            logger.warning(
                "Last name cannot be empty.",
                extra={"last_name": value},
            )
            raise serializers.ValidationError("Last name cannot be empty.")
        return value.strip() if value else value


class RegisterSerializer(UserValidationSerializer):
    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name", "username"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        request = self.context.get("request")
        ip = request.META.get("REMOTE_ADDR") if request else None

        if not validated_data.get("username"):
            validated_data["username"] = f"user_{token_urlsafe(6)}"

        user = User.objects.create_user(**validated_data)
        user.last_ip = ip
        user.is_verified = False
        user.verification_token = token_urlsafe(32)
        user.verification_sent_at = timezone.now()
        user.save()

        verification_url = f"{settings.WEB_APP_URL}/dashboard?verification_token={user.verification_token}"

        try:
            send_verification_email(user.email, verification_url)
        except Exception:
            logger.error(
                "Failed to send verification email during registration.",
                exc_info=True,
                extra={"user_id": user.id},
            )

        logger.info(
            "User registered successfully.",
            extra={"user_id": user.id},
        )

        return user


class UpdateUserSerializer(UserValidationSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "password",
            "is_verified",
            "first_name",
            "last_name",
            "birth_date",
        ]
        extra_kwargs = {"password": {"write_only": True, "required": False}}

    def validate_username(self, value):
        qs = User.objects.filter(username=value)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if value and qs.exists():
            logger.warning(
                "Username already in use.",
                extra={"username": value},
            )
            raise serializers.ValidationError("User with this username already exists.")

        return value

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
