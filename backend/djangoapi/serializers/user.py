import logging
from secrets import token_urlsafe

from django.contrib.auth import get_user_model, password_validation
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils import timezone
from rest_framework import serializers

logger = logging.getLogger(__name__)
User = get_user_model()


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
            "last_ip",
            "timezone",
            "preferred_currency",
            "conversion_rate",
            "conversion_last_updated",
        )


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
        user.save()

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


class UserCurrencySerializer(serializers.ModelSerializer):
    days_since_update = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "preferred_currency",
            "conversion_rate",
            "conversion_last_updated",
            "days_since_update",
        ]

    def get_days_since_update(self, obj):
        if not obj.conversion_last_updated:
            return None

        delta = timezone.now() - obj.conversion_last_updated
        return delta.days
