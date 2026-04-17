from django.db.models import Sum
from rest_framework import serializers

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.serializers.tag import TagSerializer
from backend.djangoapi.serializers.trade import TradeLightSerializer
from backend.djangoapi.utils.account import UserTimezoneDateTimeField


class JournalEntryListSerializer(serializers.ModelSerializer):
    trades = TradeLightSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    total_pnl = serializers.SerializerMethodField()
    total_eval_pnl = serializers.SerializerMethodField()
    account_count = serializers.SerializerMethodField()
    eval_account_count = serializers.SerializerMethodField()
    date_time = UserTimezoneDateTimeField()
    eval_trade_ids = serializers.SerializerMethodField()

    class Meta:
        model = JournalEntry
        fields = [
            "id",
            "date_time",
            "risk",
            "eval_risk",
            "contracts",
            "eval_contracts",
            "outcome",
            "eval_outcome",
            "description",
            "instrument",
            "image_url",
            "total_pnl",
            "total_eval_pnl",
            "account_count",
            "eval_account_count",
            "trades",
            "eval_trade_ids",
            "tags",
        ]

    def get_total_pnl(self, obj):
        return (
            obj.trades.filter(account__template__is_evaluation=False).aggregate(
                total=Sum("pnl")
            )["total"]
            or 0
        )

    def get_total_eval_pnl(self, obj):
        return (
            obj.trades.filter(account__template__is_evaluation=True).aggregate(
                total=Sum("pnl")
            )["total"]
            or 0
        )

    def get_account_count(self, obj):
        return (
            obj.trades.filter(account__template__is_evaluation=False)
            .values("id")
            .distinct()
            .count()
        )

    def get_eval_account_count(self, obj):
        return (
            obj.trades.filter(account__template__is_evaluation=True)
            .values("id")
            .distinct()
            .count()
        )

    def get_eval_trade_ids(self, obj):
        return list(
            obj.trades.filter(account__template__is_evaluation=True).values_list(
                "id", flat=True
            )
        )

    def get_image_url(self, obj):
        request = self.context.get("request")

        if not obj.image:
            return None

        try:
            url = obj.image.url
        except ValueError:
            return None

        return request.build_absolute_uri(url) if request else url
