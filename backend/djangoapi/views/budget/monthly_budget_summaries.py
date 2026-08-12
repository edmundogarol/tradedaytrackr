from datetime import timedelta

from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.budget_purchase import BudgetPurchase
from backend.djangoapi.models.payout import Payout


class MonthlyBudgetSummariesView(APIView):
    permission_classes = [IsAuthenticated]
    PAGE_SIZE = 12  # 👈 always 12

    def get(self, request):
        user = request.user

        now = timezone.now()
        start_date = now - timedelta(days=365)

        # ---------------------------
        # GET SPEND (LAST 12 MONTHS)
        # ---------------------------
        purchases = (
            BudgetPurchase.objects.filter(
                user=user,
                purchase_date__gte=start_date,
            )
            .annotate(month=TruncMonth("purchase_date"))
            .values("month")
            .annotate(
                total_spend=Sum("cost"),
                purchases_count=Count("id"),
            )
        )
        spend_map = {row["month"].strftime("%Y-%m"): row for row in purchases}

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
            .annotate(total_payout=Sum("amount"))
        )
        payout_map = {row["month"].strftime("%Y-%m"): row for row in payouts}

        # ---------------------------
        # ENSURE FULL 12 MONTHS
        # ---------------------------
        results = []

        for i in range(12):
            month_date = now.replace(day=1) - timedelta(days=30 * i)
            month_key = month_date.strftime("%Y-%m")

            spend_row = spend_map.get(month_key)
            payout_row = payout_map.get(month_key)

            total_spend = round((spend_row["total_spend"] if spend_row else 0) or 0, 2)
            total_payout = round(
                (payout_row["total_payout"] if payout_row else 0) or 0, 2
            )

            results.append(
                {
                    "month": month_key,
                    "total_spend": total_spend,
                    "purchases_count": (spend_row["purchases_count"] if spend_row else 0),
                    "total_payout": total_payout,
                    "net": round(total_payout - total_spend, 2),
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
