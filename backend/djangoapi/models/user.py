from django.db import models
from django.utils import timezone

from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.TextField(max_length=50, blank=False, unique=True)
    first_name = models.TextField(max_length=50, blank=True)
    last_name = models.TextField(max_length=50, blank=True)
    username = models.TextField(max_length=50, blank=True)
    birth_date = models.DateTimeField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True)
    verified = models.TextField(max_length=50, blank=False, null=True)
    last_ip = models.TextField(max_length=30, blank=False, null=True)

    USERNAME_FIELD = "email"
