from django.db.models import Count, DecimalField, Sum, Value
from django.db.models.functions import Coalesce
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer
from backend.djangoapi.serializers.journal_entry_list import JournalEntryListSerializer


class JournalEntryViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        qs = JournalEntry.objects.filter(user=self.request.user)

        qs = qs.annotate(
            total_pnl=Coalesce(
                Sum("trades__pnl"),
                Value(0),
                output_field=DecimalField(),
            ),
            trade_count=Count("trades"),
        )

        qs = qs.prefetch_related(
            "trades",
            "trades__account",
            "trades__account__template",
            "tags",
        )

        return qs.order_by("-date_time")

    def get_serializer_class(self):
        if self.action == "list":
            return JournalEntryListSerializer
        return JournalEntrySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
