from datetime import timedelta

from django.db.models import Count, F, Q
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.models.trading_account import TradingAccount


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
        withdrawable = sum(acc.get_withdrawable_amount() for acc in funded_accounts)

        # =========================
        # UPCOMING PAYOUT
        # =========================
        expected_payout_now = sum(
            acc.get_expected_withdrawable_now() for acc in funded_accounts
        )

        # =========================
        # DAYS TO PAYOUT
        # =========================
        today = timezone.now().date()

        candidates = [
            acc
            for acc in funded_accounts
            if acc.get_withdrawable_amount() > 0  # buffer met
        ]

        if candidates:
            # pick closest by days (highest progress)
            reference_account = max(
                candidates, key=lambda acc: acc.get_current_day_count()
            )

            avg_trade = reference_account.get_average_trade()

            expected_payout_now = (
                reference_account.get_withdrawable_amount() + avg_trade
            )

            days_remaining = reference_account.get_days_remaining()

            projected_date = today + timedelta(days=days_remaining)

        else:
            projected_date = None
            reference_account = None
            days_remaining = 0
        # =========================
        # WIN RATE
        # =========================
        recent_trades_qs = Trade.objects.filter(account__in=funded_accounts).order_by(
            "-date_time"
        )[:50]

        stats = recent_trades_qs.aggregate(
            total=Count("id"),
            wins=Count("id", filter=Q(pnl__gt=0)),
        )

        total_trades = stats["total"] or 0
        winning_trades = stats["wins"] or 0

        win_rate = (winning_trades / total_trades * 100) if total_trades else 0

        # =========================
        # ACTIVE PAs
        # =========================
        active_pas = funded_accounts.count()

        near_payout = sum(
            1
            for acc in funded_accounts
            if acc.get_days_remaining() <= 2 and acc.get_withdrawable_amount() > 0
        )

        # =========================
        # BUFFER
        # =========================

        accounts_with_buffer = []

        for acc in funded_accounts:
            current_buffer = max(acc.account_balance - acc.template.account_size, 0)

            if current_buffer == 0:
                continue

            min_buffer = acc.template.min_buffer or 0

            buffer_left = max(min_buffer - current_buffer, 0)

            # ignore already completed accounts (optional)
            if buffer_left == 0:
                continue

            accounts_with_buffer.append(
                {
                    "account": acc,
                    "buffer_left": buffer_left,
                    "min_buffer": min_buffer,
                    "firm": acc.template.firm,
                }
            )

        accounts_with_buffer.sort(key=lambda x: x["buffer_left"])

        GROUP_THRESHOLD = 300  # tweak this

        groups = []

        for item in accounts_with_buffer:
            placed = False

            for group in groups:
                if abs(group["buffer_left"] - item["buffer_left"]) <= GROUP_THRESHOLD:
                    group["accounts"].append(item)
                    placed = True
                    break

            if not placed:
                groups.append(
                    {
                        "buffer_left": item["buffer_left"],
                        "min_buffer": item["min_buffer"],
                        "accounts": [item],
                    }
                )

        buffer_groups = []

        for group in groups:
            buffer_groups.append(
                {
                    "buffer_left": round(group["buffer_left"], 2),
                    "min_buffer": group["min_buffer"],
                    "account_count": len(group["accounts"]),
                    "firms": list(set(acc["firm"] for acc in group["accounts"])),
                }
            )

        # =========================
        # RESPONSE
        # =========================
        if reference_account:
            days_completed = reference_account.get_current_day_count()
            min_days_required = reference_account.template.min_trading_days or 0
            days_remaining = reference_account.get_days_remaining()
            firm_name = reference_account.template.name if reference_account else None
        else:
            days_completed = 0
            min_days_required = 0
            days_remaining = 0
            firm_name = None
            projected_date = None

        return Response(
            {
                "upcoming_payout": {
                    "expected": round(expected_payout_now, 2),
                    "projected_date": projected_date,
                    "days_completed": days_completed,
                    "min_days": min_days_required,
                    "firm_name": firm_name,
                    "days_remaining": days_remaining,
                },
                "current_stats": {
                    "withdrawable_pnl": round(withdrawable, 2),
                    "days_to_payout": days_remaining,
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
                    "groups": buffer_groups,
                },
            }
        )
