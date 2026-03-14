from django.db import models
from backend.djangoapi.models.user import User
from backend.djangoapi.models.trade import Trade


class JournalEntry(models.Model):

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="journal_entries"
    )

    date_time = models.DateTimeField()
    instrument = models.CharField(max_length=10)
    risk = models.DecimalField(max_digits=10, decimal_places=2)
    contracts = models.IntegerField()
    outcome = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=1000)
    image = models.URLField(blank=True, null=True)
    tags = models.JSONField(default=list)
    trades = models.ManyToManyField(Trade, related_name="journal_entries")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [models.Index(fields=["user", "date_time"])]
