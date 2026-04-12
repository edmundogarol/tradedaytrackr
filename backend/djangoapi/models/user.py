from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone

from backend.djangoapi.managers.user import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)

    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    username = models.CharField(max_length=50, blank=True, unique=True)

    birth_date = models.DateTimeField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_demo = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)

    is_verified = models.BooleanField(default=False)
    verification_token_hash = models.CharField(max_length=64, null=True, blank=True)
    verification_sent_at = models.DateTimeField(null=True, blank=True)

    last_ip = models.GenericIPAddressField(null=True, blank=True)
    timezone = models.CharField(max_length=50, default="UTC")

    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return self.email
