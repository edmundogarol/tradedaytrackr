import hashlib

from django.db import models
from django.utils import timezone


class ResetPasswordSession(models.Model):
    user = models.ForeignKey("djangoapi.User", on_delete=models.PROTECT)

    token_hash = models.CharField(max_length=64, blank=False)

    created_date = models.DateTimeField(default=timezone.now)
    is_used = models.BooleanField(default=False)

    def is_expired(self):
        return self.created_date < timezone.now() - timezone.timedelta(hours=1)

    def set_token(self, raw_token: str):
        self.token_hash = hashlib.sha256(raw_token.encode()).hexdigest()

    def check_token(self, raw_token: str):
        return self.token_hash == hashlib.sha256(raw_token.encode()).hexdigest()

    def __str__(self):
        return f"ResetPasswordSession(user={self.user_id}, created={self.created_date})"
