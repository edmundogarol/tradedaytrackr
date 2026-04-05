from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models import JournalEntry
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer
from backend.djangoapi.serializers.journal_entry_list import JournalEntryListSerializer


class JournalEntryViewSet(ModelViewSet):
    queryset = JournalEntry.objects.prefetch_related(
        "trades__account", "trades__account__template"
    )
    serializer_class = JournalEntrySerializer

    def get_serializer_class(self):
        if self.action == "list":
            return JournalEntryListSerializer
        return JournalEntrySerializer
