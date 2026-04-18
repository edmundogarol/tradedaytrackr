from django.db import models
from django.db.models import Sum
from django.utils import timezone

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
        account_size = template.account_size
        min_buffer = template.min_buffer or 0
        split = template.withdrawal_split

        profit = balance - account_size

        if profit <= 0:
            return 0

        max_by_split = profit
        if split or split != 0:
            max_by_split = (profit * split) / 100

        max_by_buffer = balance - (account_size + min_buffer)

        available = min(max_by_split, max_by_buffer)

        if available <= 0:
            return 0

        if available < min_req:
            return 0

        if max_req:
            available = min(available, max_req)

        return round(available, 2)

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
        return self.get_consistency_score() <= template_consistency

    def is_min_days_met(self):
        return self.get_current_day_count() >= (self.template.min_trading_days or 0)

    def get_expected_withdrawable_now(self):
        withdrawable = self.get_withdrawable_amount()

        if withdrawable <= 0:
            return 0

        if not self.is_consistency_met():
            return 0

        if not self.is_min_days_met():
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
