from django.db.models import Prefetch
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer
from backend.djangoapi.serializers.journal_entry_list import JournalEntryListSerializer


# Used for testing
class JournalEntryPagination(PageNumberPagination):
    page_size = 3  # test value
    page_size_query_param = "page_size"
    max_page_size = 100


class JournalEntryViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    # pagination_class = JournalEntryPagination

    def get_queryset(self):
        qs = JournalEntry.objects.filter(user=self.request.user)

        qs = qs.prefetch_related(
            Prefetch(
                "trades",
                queryset=Trade.objects.select_related("account", "account__template"),
            ),
            "tags",
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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        return Response(
            {"detail": "Journal entry deleted successfully."},
            status=200,
        )
