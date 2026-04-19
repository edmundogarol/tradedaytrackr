from django.db.models import Count, DecimalField, Sum, Value
from django.db.models.functions import TruncMonth
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.payout import Payout
from backend.djangoapi.models.trade import Trade


class MonthlyPnLView(APIView):
    permission_classes = [IsAuthenticated]
    PAGE_SIZE = 10

    def get(self, request):
        user = request.user
        page = int(request.query_params.get("page", 1))

        # ---------------------------
        # TRADES (positive pnl)
        # ---------------------------
        trades = (
            Trade.objects.filter(account__user=user)
            .annotate(month=TruncMonth("date_time"))
            .values("month")
            .annotate(amount=Sum("pnl"))
        )

        # ---------------------------
        # PAYOUTS (negative pnl + count)
        # ---------------------------
        payouts = (
            Payout.objects.filter(account__user=user)
            .annotate(month=TruncMonth("payout_date"))
            .values("month")
            .annotate(
                amount=Sum("amount") * Value(-1, output_field=DecimalField()),
                count=Count("id"),
            )
        )

        # ---------------------------
        # COMBINE
        # ---------------------------
        monthly = {}

        for row in trades:
            month = row["month"].date()
            monthly.setdefault(month, {"net": 0, "payouts_count": 0})
            monthly[month]["net"] += row["amount"] or 0

        for row in payouts:
            month = row["month"].date()
            monthly.setdefault(month, {"net": 0, "payouts_count": 0})
            monthly[month]["net"] += row["amount"] or 0
            monthly[month]["payouts_count"] += row["count"] or 0

        # ---------------------------
        # FORMAT
        # ---------------------------
        results = [
            {
                "month": month.strftime("%Y-%m"),
                "net_pnl": round(values["net"], 2),
                "payouts_count": values["payouts_count"],
            }
            for month, values in monthly.items()
        ]

        results.sort(key=lambda x: x["month"], reverse=True)

        # ---------------------------
        # PAGINATION
        # ---------------------------
        total_count = len(results)

        start = (page - 1) * self.PAGE_SIZE
        end = start + self.PAGE_SIZE

        paginated = results[start:end]

        return Response(
            {
                "count": total_count,
                "next": page + 1 if end < total_count else None,
                "previous": page - 1 if page > 1 else None,
                "results": paginated,
            }
        )
