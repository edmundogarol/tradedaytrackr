from datetime import timedelta

from django.db.models import Count, F
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.models.trading_day import TradingDay


class DashboardSummariesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        accounts = TradingAccount.objects.filter(user=user).select_related("template")

        funded_accounts = accounts.filter(
            template__is_evaluation=False, is_archived=False
        )
        eval_accounts = accounts.filter(template__is_evaluation=True, is_archived=False)

        # =========================
        # FUNDING OVERVIEW
        # =========================
        total_active_funding = sum(a.template.account_size for a in funded_accounts)

        firms = {}
        for acc in funded_accounts:
            firm = acc.template.firm
            firms[firm] = firms.get(firm, 0) + 1

        # =========================
        # EVALUATIONS
        # =========================
        total_evals = eval_accounts.count()

        passed_evals = eval_accounts.filter(
            account_balance__gte=F("template__account_size")
            + F("template__profit_target")
        ).count()

        # =========================
        # WITHDRAWABLE PNL
        # =========================
        withdrawable = 0
        for acc in funded_accounts:
            withdrawable += getattr(acc, "withdrawable_amount", 0)

        # =========================
        # DAYS TO PAYOUT
        # =========================
        trading_days = TradingDay.objects.filter(
            account__in=funded_accounts,
            is_valid_day=True,
        )

        current_day_count = trading_days.aggregate(max_day=Count("id"))["max_day"] or 0

        min_days_required = (
            funded_accounts.first().template.min_trading_days
            if funded_accounts.exists()
            else 0
        )

        days_to_payout = max(min_days_required - current_day_count, 0)

        # =========================
        # UPCOMING PAYOUT
        # =========================
        expected_payout = withdrawable

        projected_date = timezone.now() + timedelta(days=days_to_payout)

        # =========================
        # WIN RATE
        # =========================
        trades = Trade.objects.filter(account__in=funded_accounts)

        total_trades = trades.count()
        winning_trades = trades.filter(pnl__gt=0).count()

        win_rate = (winning_trades / total_trades * 100) if total_trades else 0

        # =========================
        # ACTIVE PAs
        # =========================
        active_pas = funded_accounts.count()

        near_payout = funded_accounts.filter(account_balance__gt=0).count()

        # =========================
        # BUFFER
        # =========================
        total_buffer = 0
        total_buffer_target = 0

        for acc in funded_accounts:
            total_buffer += max(acc.account_balance - acc.template.account_size, 0)
            total_buffer_target += acc.template.min_buffer or 0

        # =========================
        # RESPONSE
        # =========================
        return Response(
            {
                "upcoming_payout": {
                    "expected": round(expected_payout, 2),
                    "projected_date": projected_date,
                    "days_completed": current_day_count,
                    "min_days": min_days_required,
                    "days_remaining": days_to_payout,
                },
                "current_stats": {
                    "withdrawable_pnl": round(withdrawable, 2),
                    "days_to_payout": days_to_payout,
                    "active_pas": active_pas,
                    "near_payout": near_payout,
                    "win_rate": round(win_rate, 2),
                },
                "funding_overview": {
                    "total_active_funding": total_active_funding,
                    "firms": firms,
                },
                "evaluations": {
                    "passed": passed_evals,
                    "total": total_evals,
                },
                "buffer": {
                    "current": round(total_buffer, 2),
                    "target": round(total_buffer_target, 2),
                },
            }
        )
