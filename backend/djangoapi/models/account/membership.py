from django.db import models


class Membership(models.Model):
    user = models.OneToOneField("djangoapi.User", on_delete=models.CASCADE)
    whop_membership_id = models.CharField(max_length=255, unique=True)
    status = models.CharField(max_length=20)  # active / inactive
    is_active = models.BooleanField(default=False)
    cancel_at_period_end = models.BooleanField(default=False)
    current_period_end = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
