from django.db import models


class Membership(models.Model):
    user = models.OneToOneField("djangoapi.User", on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    whop_user_id = models.CharField(max_length=255, null=True, blank=True)
    plan = models.CharField(max_length=100, null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
