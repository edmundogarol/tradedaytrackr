from django.utils import timezone
from django.db import models
from backend.djangoapi.models import User


class ResetPasswordSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=False, null=True)
    token = models.TextField(max_length=70, blank=False)
    verified_token = models.TextField(max_length=70, blank=False, null=True)
    created_date = models.DateTimeField(null=False, blank=False, default=timezone.now)
