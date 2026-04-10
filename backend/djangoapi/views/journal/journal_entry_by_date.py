from datetime import datetime, timedelta

from django.utils.timezone import make_aware
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer


class JournalEntriesByDateView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get(self, request):
        date_str = request.query_params.get("date")

        if not date_str:
            return Response({"error": "date is required"}, status=400)

        try:
            date = datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            return Response({"error": "Invalid date format"}, status=400)

        start = make_aware(datetime.combine(date, datetime.min.time()))
        end = start + timedelta(days=1)

        journals = (
            JournalEntry.objects.filter(
                user=request.user,
                date_time__gte=start,
                date_time__lt=end,
            )
            .prefetch_related("trades", "tags")
            .order_by("date_time")
        )

        serializer = JournalEntrySerializer(journals, many=True)

        return Response(serializer.data)
