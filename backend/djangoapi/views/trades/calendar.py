from collections import defaultdict
from datetime import datetime, timedelta
from decimal import Decimal

from django.db.models import Count, Sum
from django.db.models.functions import TruncDate
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.models.trade import Trade


class CalendarSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # ---------------------------
        # DATE PARAM (optional)
        # ---------------------------
        date_param = request.query_params.get("date")

        try:
            if date_param:
                now = datetime.fromisoformat(date_param)
                now = timezone.make_aware(now, timezone.get_current_timezone())
            else:
                now = timezone.now()
        except Exception:
            return Response(
                {"detail": "Invalid date format. Use YYYY-MM-DD"}, status=400
            )

        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        if now.month == 12:
            end_of_month = now.replace(year=now.year + 1, month=1, day=1)
        else:
            end_of_month = now.replace(month=now.month + 1, day=1)

        # ---------------------------
        # FUNDED TRADES (is_evaluation=False)
        # ---------------------------
        trades = (
            Trade.objects.filter(
                account__user=user,
                account__template__is_evaluation=False,
                date_time__gte=start_of_month,
                date_time__lt=end_of_month,
            )
            .annotate(day=TruncDate("date_time"))
            .values("day")
            .annotate(
                total_pnl=Sum("pnl"),
                total_trades=Count("id"),
            )
        )

        # ---------------------------
        # EVAL TRADES (is_evaluation=True)
        # ---------------------------
        eval_trades = (
            Trade.objects.filter(
                account__user=user,
                account__template__is_evaluation=True,
                date_time__gte=start_of_month,
                date_time__lt=end_of_month,
            )
            .annotate(day=TruncDate("date_time"))
            .values("day")
            .annotate(
                total_pnl=Sum("pnl"),
                total_trades=Count("id"),
            )
        )

        # ---------------------------
        # JOURNALS (GLOBAL)
        # ---------------------------
        journals = (
            JournalEntry.objects.filter(
                user=user,
                date_time__gte=start_of_month,
                date_time__lt=end_of_month,
            )
            .annotate(day=TruncDate("date_time"))
            .values("day")
            .annotate(total_journals=Count("id"))
        )

        # ---------------------------
        # MERGE DAILY DATA
        # ---------------------------
        daily_map = defaultdict(
            lambda: {
                "pnl": Decimal("0"),
                "trades": 0,
                "journals": 0,
                "eval_pnl": Decimal("0"),
                "eval_trades": 0,
            }
        )

        # funded
        for t in trades:
            day = str(t["day"])
            daily_map[day]["pnl"] = t["total_pnl"] or Decimal("0")
            daily_map[day]["trades"] = t["total_trades"]

        # eval
        for t in eval_trades:
            day = str(t["day"])
            daily_map[day]["eval_pnl"] = t["total_pnl"] or Decimal("0")
            daily_map[day]["eval_trades"] = t["total_trades"]

        # journals
        for j in journals:
            day = str(j["day"])
            daily_map[day]["journals"] = j["total_journals"]

        # ---------------------------
        # WEEKLY AGGREGATION
        # ---------------------------
        weekly_map = defaultdict(Decimal)
        eval_weekly_map = defaultdict(Decimal)

        for day_str, data in daily_map.items():
            day = timezone.datetime.fromisoformat(day_str)
            week_start = (day - timedelta(days=day.weekday())).date()

            weekly_map[str(week_start)] += data["pnl"]
            eval_weekly_map[str(week_start)] += data["eval_pnl"]

        # ---------------------------
        # MONTHLY TOTALS
        # ---------------------------
        monthly_total = sum((d["pnl"] for d in daily_map.values()), Decimal("0"))
        eval_monthly_total = sum(
            (d["eval_pnl"] for d in daily_map.values()), Decimal("0")
        )

        # ---------------------------
        # FORMAT DAILY
        # ---------------------------
        daily_results = [
            {
                "date": day,
                "pnl": round(values["pnl"], 2),
                "trades": values["trades"],
                "journals": values["journals"],
                "eval_pnl": round(values["eval_pnl"], 2),
                "eval_trades": values["eval_trades"],
            }
            for day, values in daily_map.items()
        ]

        # ---------------------------
        # FORMAT WEEKLY
        # ---------------------------
        weekly_results = [
            {
                "week_start": week,
                "pnl": round(weekly_map[week], 2),
                "eval_pnl": round(eval_weekly_map[week], 2),
            }
            for week in weekly_map.keys()
        ]

        # sort
        daily_results.sort(key=lambda x: x["date"])
        weekly_results.sort(key=lambda x: x["week_start"])

        # ---------------------------
        # RESPONSE
        # ---------------------------
        return Response(
            {
                "daily": daily_results,
                "weekly": weekly_results,
                "monthly_total": round(monthly_total, 2),
                "eval_monthly_total": round(eval_monthly_total, 2),
            }
        )
