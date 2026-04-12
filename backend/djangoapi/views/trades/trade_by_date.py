from datetime import datetime, timedelta

import pytz
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.serializers.trade import TradeSerializer


class TradesByDateView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get(self, request):
        user_tz = pytz.timezone(request.user.timezone)

        date_str = request.query_params.get("date")

        if not date_str:
            return Response({"error": "date is required"}, status=400)

        try:
            date = datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            return Response({"error": "Invalid date format"}, status=400)

        # local day boundaries
        local_start = user_tz.localize(datetime.combine(date, datetime.min.time()))
        local_end = local_start + timedelta(days=1)

        # convert to UTC for DB query
        start = local_start.astimezone(pytz.UTC)
        end = local_end.astimezone(pytz.UTC)

        trades = (
            Trade.objects.filter(
                account__user=request.user,
                date_time__gte=start,
                date_time__lt=end,
            )
            .select_related("account", "account__template", "journal_entry")
            .order_by("date_time")
        )

        serializer = TradeSerializer(
            trades,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)
