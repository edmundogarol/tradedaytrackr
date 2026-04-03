import logging

from django.contrib.auth.models import BaseUserManager

logger = logging.getLogger(__name__)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            logger.warning("Attempted to create a user without an email.")
            raise ValueError("The Email field must be set")

        if not password:
            logger.warning(
                "Attempted to create a user without a password.",
                extra={"email": email},
            )
            raise ValueError("Users must have a password")

        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        logger.info(
            "User created successfully.",
            extra={"email": email},
        )

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            logger.error("Invalid superuser creation: is_staff must be True.")
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            logger.error("Invalid superuser creation: is_superuser must be True.")
            raise ValueError("Superuser must have is_superuser=True")

        logger.info(
            "Creating superuser.",
            extra={"email": email},
        )

        return self._create_user(email, password, **extra_fields)
