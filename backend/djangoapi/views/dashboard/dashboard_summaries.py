from datetime import timedelta

from django.db.models import Count, F, Q
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.models.trade import Trade
from backend.djangoapi.models.trading_account import TradingAccount


def _nth_trading_day(start_date, trading_days):
    """Date of the `trading_days`-th weekday counting from (and including)
    `start_date`, skipping Sat/Sun.

    Markets (and therefore trading-day progress) are closed on weekends,
    so a naive `start_date + timedelta(days=trading_days)` regularly lands
    on - or undercounts past - a weekend. `start_date` itself counts as a
    candidate trading day (e.g. "today") since it may not have happened
    yet.
    """
    date = start_date
    remaining = trading_days

    while True:
        if date.weekday() < 5:  # Mon-Fri
            remaining -= 1
            if remaining <= 0:
                return date
        date += timedelta(days=1)


def _next_payout_requestable_date(start_date, trading_days):
    """Date the payout can actually be requested: the day after the
    `trading_days`-th trading day finishes, since a trading day's PnL
    isn't final - and payout isn't requestable - until it's over.
    """
    return _nth_trading_day(start_date, trading_days) + timedelta(days=1)


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

        # Every account that's fully payout-eligible right now (min days,
        # consistency, and safety net all met) — surfaced so the frontend
        # can offer a choice when more than one account qualifies at once.
        ready_accounts = [
            {
                "id": acc.id,
                "account_name": acc.account_name,
                "firm": acc.template.firm,
                "withdrawable_amount": acc.get_expected_withdrawable_now(),
            }
            for acc in funded_accounts
            if acc.get_days_remaining() <= 0
            and acc.get_expected_withdrawable_now() > 0
        ]
        ready_accounts.sort(key=lambda a: a["withdrawable_amount"], reverse=True)

        if candidates:
            # pick closest by days (highest progress)
            reference_account = max(
                candidates, key=lambda acc: acc.get_current_day_count()
            )

            days_remaining = reference_account.get_days_remaining()

            # already payout-eligible right now (min days met, consistency
            # met, profit above safety net) — show the real amount
            # available today rather than a padded future projection.
            already_eligible = (
                days_remaining <= 0
                and reference_account.get_expected_withdrawable_now() > 0
            )

            if already_eligible:
                expected_payout_now = reference_account.get_expected_withdrawable_now()
                projected_date = today
            else:
                # Not yet eligible (min days / consistency not met) - show
                # the actual amount currently withdrawable, same figure as
                # "Withdrawable PnL" below. Padding this with a projected
                # average trade made the "Available" headline overstate
                # what's actually there.
                expected_payout_now = reference_account.get_withdrawable_amount()

                # Anchor the projection the day AFTER the most recent
                # trading day already banked - today only counts as a
                # candidate itself when it hasn't been traded (and
                # therefore counted) yet. Otherwise a day that's already
                # reflected in days_remaining gets counted a second time,
                # pulling the projected date in too early.
                last_trading_day = reference_account.get_last_trading_day_date()
                anchor = (
                    last_trading_day + timedelta(days=1)
                    if last_trading_day and last_trading_day >= today
                    else today
                )

                projected_date = _next_payout_requestable_date(
                    anchor, days_remaining
                )

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

        # "Near" means approaching eligibility, not already there — matches
        # the Funded Accounts page's own definition (buffer_percent < 100
        # excludes accounts that are already payout-eligible).
        near_payout = sum(
            1
            for acc in funded_accounts
            if 70 < acc.get_buffer_percent() < 100
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

            accounts_with_buffer.append(
                {
                    "account": acc,
                    "current_buffer": current_buffer,
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
            # uncapped — shows surplus once an account clears its min buffer,
            # matching the per-account "$X / $min_buffer" figure on the
            # Funded Accounts / Account Detail pages
            buffer_achieved = max(
                acc["current_buffer"] for acc in group["accounts"]
            )

            buffer_groups.append(
                {
                    "buffer_left": round(group["buffer_left"], 2),
                    "buffer_achieved": round(buffer_achieved, 2),
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
            reference_account_id = reference_account.id
        else:
            days_completed = 0
            min_days_required = 0
            days_remaining = 0
            firm_name = None
            projected_date = None
            reference_account_id = None

        return Response(
            {
                "upcoming_payout": {
                    "expected": round(expected_payout_now, 2),
                    "projected_date": projected_date,
                    "days_completed": days_completed,
                    "min_days": min_days_required,
                    "firm_name": firm_name,
                    "days_remaining": days_remaining,
                    "account_id": reference_account_id,
                    "ready_accounts": ready_accounts,
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
