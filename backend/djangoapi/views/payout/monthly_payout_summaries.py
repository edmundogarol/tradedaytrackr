from datetime import timedelta

from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.payout import Payout


class MonthlyPayoutSummariesView(APIView):
    permission_classes = [IsAuthenticated]
    PAGE_SIZE = 12  # 👈 always 12

    def get(self, request):
        user = request.user

        now = timezone.now()
        start_date = now - timedelta(days=365)

        # ---------------------------
        # GET PAYOUTS (LAST 12 MONTHS)
        # ---------------------------
        payouts = (
            Payout.objects.filter(
                account__user=user,
                payout_date__gte=start_date,
            )
            .annotate(month=TruncMonth("payout_date"))
            .values("month")
            .annotate(
                total_payout=Sum("amount"),
                payouts_count=Count("id"),
            )
        )

        # ---------------------------
        # MAP RESULTS
        # ---------------------------
        payout_map = {row["month"].strftime("%Y-%m"): row for row in payouts}

        # ---------------------------
        # ENSURE FULL 12 MONTHS
        # ---------------------------
        results = []

        for i in range(12):
            month_date = now.replace(day=1) - timedelta(days=30 * i)
            month_key = month_date.strftime("%Y-%m")

            row = payout_map.get(month_key)

            results.append(
                {
                    "month": month_key,
                    "total_payout": round((row["total_payout"] if row else 0) or 0, 2),
                    "payouts_count": (row["payouts_count"] if row else 0),
                }
            )

        # latest → oldest
        results.sort(key=lambda x: x["month"], reverse=True)

        return Response(
            {
                "count": 12,
                "next": None,
                "previous": None,
                "results": results,
            }
        )
