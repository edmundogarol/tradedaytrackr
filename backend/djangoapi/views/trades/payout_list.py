from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.serializers.payout import PayoutListSerializer


class PayoutPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50


class PayoutListView(ListAPIView):
    serializer_class = PayoutListSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PayoutPagination

    def get_queryset(self):
        return (
            Payout.objects.filter(account__user=self.request.user)
            .select_related("account", "journal_entry")
            .order_by("-payout_date")
        )
