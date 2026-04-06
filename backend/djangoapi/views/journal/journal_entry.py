from django.db.models import Count, Sum, Value
from django.db.models.functions import Coalesce
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models import JournalEntry
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer
from backend.djangoapi.serializers.journal_entry_list import JournalEntryListSerializer


class JournalEntryViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            JournalEntry.objects.filter(user=self.request.user)
            .prefetch_related("trades__account", "trades__account__template")
            .annotate(
                total_pnl=Coalesce(Sum("trades__pnl", distinct=True), Value(0)),
                trade_count=Count("trades", distinct=True),
            )
        )

    def get_serializer_class(self):
        if self.action == "list":
            return JournalEntryListSerializer
        return JournalEntrySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
