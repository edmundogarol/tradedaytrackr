from django.db import models
from django.db.models import Sum
from django.utils import timezone

from backend.djangoapi.constants.apex_payouts import (
    APEX_MAX_PAYOUT_BY_SIZE,
    APEX_MAX_PAYOUTS_PER_ACCOUNT,
)
from backend.djangoapi.querysets.trading_account_queryset import TradingAccountQuerySet


class TradingAccount(models.Model):
    user = models.ForeignKey(
        "djangoapi.User", on_delete=models.CASCADE, related_name="trading_accounts"
    )
    objects = TradingAccountQuerySet.as_manager()
    template = models.ForeignKey(
        "djangoapi.TradingAccountTemplate",
        on_delete=models.PROTECT,
        related_name="accounts",
    )
    account_name = models.CharField(max_length=150)
    account_balance = models.DecimalField(max_digits=12, decimal_places=2)
    baseline_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)
    archived_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def archive(self):
        self.is_archived = True
        self.archived_at = timezone.now()
        self.save(update_fields=["is_archived", "archived_at"])

    def unarchive(self):
        self.is_archived = False
        self.archived_at = None
        self.save(update_fields=["is_archived", "archived_at"])

    def get_withdrawable_amount(self):
        template = self.template
        balance = self.account_balance

        min_req = template.min_payout_request or 0
        max_req = template.max_payout_request

        has_static_rule = template.rules.filter(
            name="MFFU $100 MLL after Payout #1"
        ).exists()

        # STATIC RULE
        if has_static_rule:
            floor = 50100
            max_safe = balance - floor

            if max_safe <= 0:
                return 0

            if template.withdrawal_split:
                max_safe = (max_safe * template.withdrawal_split) / 100

            if template.max_payout_request:
                max_safe = min(max_safe, template.max_payout_request)

            if max_safe < min_req:
                return 0

            return round(max_safe, 2)

        # NORMAL
        # Only profit above the Safety Net is eligible for payout.
        # Safety Net = account size + drawdown limit + $100 (per firm rules,
        # e.g. Apex: "Safety Net is calculated as your account's drawdown
        # limit plus $100"). `min_buffer` is a separate figure (Safety Net +
        # minimum payout) used elsewhere to track eligibility progress, not
        # the amount held back from the withdrawable pool.
        account_size = template.account_size
        drawdown_limit = template.max_drawdown or 0
        safety_net = account_size + drawdown_limit + 100
        split = template.withdrawal_split

        # Apex Intraday PAs cap each payout on a per-payout-number ladder
        # (e.g. 100K: $2,000 / $2,500 / $3,000 / $3,000 / $4,000 / $4,000)
        # and allow a maximum of 6 payouts total before the PA is closed.
        if (template.firm or "").lower() == "apex":
            tier_caps = APEX_MAX_PAYOUT_BY_SIZE.get(int(account_size))
            if tier_caps:
                payout_number = self.payouts.count() + 1
                if payout_number > APEX_MAX_PAYOUTS_PER_ACCOUNT:
                    return 0
                max_req = tier_caps[payout_number - 1]

        profit_above_safety_net = balance - safety_net

        if profit_above_safety_net <= 0:
            return 0

        available = profit_above_safety_net
        if split:
            available = (profit_above_safety_net * split) / 100

        if available <= 0:
            return 0

        if available < min_req:
            return 0

        if max_req:
            available = min(available, max_req)

        return round(available, 2)

    def get_withdrawable_breakdown(self):
        """Structured explanation of get_withdrawable_amount(): what made up
        the figure (safety net / split / any payout-scaling cap) and
        whether the account is actually eligible to request it right now
        (min trading days + consistency). Powers the "what's withdrawable /
        when is it withdrawable" info popout on the accounts list.
        """
        template = self.template
        balance = self.account_balance

        min_req = float(template.min_payout_request or 0)
        max_req = template.max_payout_request

        has_static_rule = template.rules.filter(
            name="MFFU $100 MLL after Payout #1"
        ).exists()

        eligibility = {
            "is_min_days_met": self.is_min_days_met(),
            "current_day_count": self.get_current_day_count(),
            "min_trading_days": template.min_trading_days or 0,
            "is_consistency_met": self.is_consistency_met(),
            "consistency_score": round(float(self.get_consistency_score()), 2),
            "consistency_threshold": (
                float(template.consistency) if template.consistency else None
            ),
        }

        if has_static_rule:
            floor = 50100
            profit_above_floor = round(max(float(balance - floor), 0), 2)

            return {
                "rule": "static_floor",
                "floor": floor,
                "profit_above_floor": profit_above_floor,
                "withdrawal_split": (
                    float(template.withdrawal_split)
                    if template.withdrawal_split
                    else None
                ),
                "payout_cap": float(max_req) if max_req else None,
                "payout_cap_source": "account_max" if max_req else None,
                "min_payout_request": min_req,
                **eligibility,
            }

        account_size = template.account_size
        drawdown_limit = template.max_drawdown or 0
        safety_net_decimal = account_size + drawdown_limit + 100
        safety_net = float(safety_net_decimal)
        split = template.withdrawal_split

        payout_cap = float(max_req) if max_req else None
        payout_cap_source = "account_max" if max_req else None
        payout_number = None
        max_payouts = None

        if (template.firm or "").lower() == "apex":
            tier_caps = APEX_MAX_PAYOUT_BY_SIZE.get(int(account_size))
            if tier_caps:
                payout_number = self.payouts.count() + 1
                max_payouts = APEX_MAX_PAYOUTS_PER_ACCOUNT
                if payout_number <= max_payouts:
                    payout_cap = tier_caps[payout_number - 1]
                    payout_cap_source = "apex_ladder"
                else:
                    payout_cap = 0
                    payout_cap_source = "apex_exhausted"

        return {
            "rule": "standard",
            "safety_net": safety_net,
            "profit_above_safety_net": round(
                float(balance - safety_net_decimal), 2
            ),
            "withdrawal_split": float(split) if split else None,
            "payout_cap": payout_cap,
            "payout_cap_source": payout_cap_source,
            "payout_number": payout_number,
            "max_payouts": max_payouts,
            "min_payout_request": min_req,
            **eligibility,
        }

    def get_buffer_percent(self):
        min_buffer = self.template.min_buffer
        profit = self.account_balance - self.template.account_size

        if not min_buffer or min_buffer == 0:
            return 0

        progress = (profit / min_buffer) * 100

        return min(round(progress, 2), 100)

    def get_current_day_count(self):
        last_payout = self.payouts.order_by("-payout_date").first()

        trading_days = self.trading_days.filter(is_valid_day=True)

        if last_payout:
            trading_days = trading_days.filter(
                trades__date_time__gt=last_payout.payout_date
            ).distinct()

        return trading_days.aggregate(max_day=models.Max("day_number"))["max_day"] or 0

    def get_consistency_score(self):
        day_pnls = (
            self.trading_days.filter(is_valid_day=True)
            .annotate(day_pnl=Sum("trades__pnl"))
            .values_list("day_pnl", flat=True)
        )

        pnls = [p for p in day_pnls if p is not None]

        if not pnls:
            return 0

        total_profit = sum(pnls)
        if total_profit == 0:
            return 0

        largest_day = max(pnls)

        return (largest_day / total_profit) * 100

    def is_consistency_met(self):
        if self.template.consistency is None or self.template.consistency == 0:
            return True
        template_consistency = self.template.consistency or 0
        # Firm rule is phrased as a failure condition ("50% or more fails"),
        # so meeting it requires being strictly under the threshold.
        return self.get_consistency_score() < template_consistency

    def is_min_days_met(self):
        return self.get_current_day_count() >= (self.template.min_trading_days or 0)

    def get_expected_withdrawable_now(self):
        withdrawable = self.get_withdrawable_amount()

        if withdrawable <= 0:
            return 0

        if not self.is_consistency_met():
            return 0

        return withdrawable

    def get_post_payout_buffer(self):
        template = self.template
        balance = self.account_balance

        withdrawable = self.get_withdrawable_amount()

        has_static_rule = template.rules.filter(
            name="MFFU $100 MLL after Payout #1"
        ).exists()

        # STATIC RULE
        if has_static_rule:
            floor = 50100
            post_balance = balance - withdrawable
            buffer_after = post_balance - floor
            return round(max(buffer_after, 0), 2)

        # NORMAL
        account_size = template.account_size
        profit = balance - account_size
        remaining_profit = profit - withdrawable

        return round(max(remaining_profit, 0), 2)

    def get_days_remaining(self):
        current = self.get_current_day_count()
        required = self.template.min_trading_days or 0
        return max(required - current, 0)

    def get_average_trade(self):
        trades = self.trades.order_by("-date_time")[:10]

        if not trades:
            return 0

        return sum(t.pnl for t in trades) / len(trades)
