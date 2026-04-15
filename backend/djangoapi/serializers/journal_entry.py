import logging

from django.db.models import Sum
from rest_framework import serializers

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.models.tag import Tag
from backend.djangoapi.models.trade import Trade
from backend.djangoapi.serializers.tag import TagSerializer

logger = logging.getLogger(__name__)


class JournalEntrySerializer(serializers.ModelSerializer):
    trade_ids = serializers.SerializerMethodField()
    trade_ids_input = serializers.PrimaryKeyRelatedField(
        source="trades",
        many=True,
        queryset=Trade.objects.all(),
        write_only=True,
        required=False,
    )

    tags = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    tag_objects = TagSerializer(source="tags", many=True, read_only=True)

    total_pnl = serializers.SerializerMethodField()
    account_count = serializers.SerializerMethodField()

    class Meta:
        model = JournalEntry
        fields = [
            "id",
            "date_time",
            "instrument",
            "risk",
            "contracts",
            "outcome",
            "description",
            "image",
            "tags",
            "tag_objects",
            "trade_ids",
            "trade_ids_input",
            "total_pnl",
            "account_count",
        ]

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")

        if request:
            fields["trade_ids_input"].queryset = Trade.objects.filter(
                account__user=request.user
            )

        return fields

    def get_trade_ids(self, obj):
        return list(obj.trades.values_list("id", flat=True))

    def get_total_pnl(self, obj):
        return obj.trades.aggregate(total=Sum("pnl"))["total"] or 0

    def get_account_count(self, obj):
        return obj.trades.count()

    def validate_tags(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Tags must be a list")

        return [str(tag).strip().lower() for tag in value if tag]

    def validate(self, data):
        if "trades" in data and not data["trades"]:
            raise serializers.ValidationError(
                {"trade_ids": "At least one trade is required"}
            )

        if "contracts" in data and data["contracts"] <= 0:
            raise serializers.ValidationError("Contracts must be positive")

        if "risk" in data and data["risk"] < 0:
            raise serializers.ValidationError("Risk cannot be negative")

        return data

    def create(self, validated_data):
        tags_data = validated_data.pop("tags", [])
        trades = validated_data.pop("trades", [])

        journal_entry = JournalEntry.objects.create(**validated_data)

        if trades:
            Trade.objects.filter(id__in=[t.id for t in trades]).update(
                journal_entry=journal_entry
            )

        self._handle_tags(journal_entry, tags_data)

        return journal_entry

    def update(self, instance, validated_data):
        tags_data = validated_data.pop("tags", None)
        trades = validated_data.pop("trades", None)

        instance = super().update(instance, validated_data)

        if trades is not None:
            current_ids = set(instance.trades.values_list("id", flat=True))
            new_ids = set(t.id for t in trades)

            Trade.objects.filter(id__in=current_ids - new_ids).update(
                journal_entry=None
            )
            Trade.objects.filter(id__in=new_ids).update(journal_entry=instance)

        if tags_data is not None:
            self._handle_tags(instance, tags_data)

        return instance

    def _handle_tags(self, instance, tags_data):
        user = self.context["request"].user
        tag_instances = []

        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(
                user=user,
                name=tag_name,
            )
            tag_instances.append(tag)

        instance.tags.set(tag_instances)
