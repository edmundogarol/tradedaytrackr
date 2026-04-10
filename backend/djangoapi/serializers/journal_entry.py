import logging

from rest_framework import serializers

from backend.djangoapi.models import JournalEntry
from backend.djangoapi.models.tag import Tag
from backend.djangoapi.serializers.tag import TagSerializer

logger = logging.getLogger(__name__)


class JournalEntrySerializer(serializers.ModelSerializer):
    trade_ids = serializers.PrimaryKeyRelatedField(
        source="trades", many=True, read_only=True
    )
    totalPnL = serializers.DecimalField(
        max_digits=10, decimal_places=2, source="total_pnl", read_only=True
    )
    accountCount = serializers.IntegerField(source="trade_count", read_only=True)
    tags = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    tag_objects = TagSerializer(source="tags", many=True, read_only=True)

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
            "trades",
            "totalPnL",
            "accountCount",
        ]

    def validate_tags(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Tags must be a list")

        return [str(tag).strip().lower() for tag in value if tag]

    def validate(self, data):
        trades = data.get("trades")

        if trades is not None and len(trades) == 0:
            raise serializers.ValidationError("Journal must have at least one trade")

        if "contracts" in data and data["contracts"] <= 0:
            raise serializers.ValidationError("Contracts must be positive")

        if "risk" in data and data["risk"] < 0:
            raise serializers.ValidationError("Risk cannot be negative")

        return data

    def create(self, validated_data):
        tags_data = validated_data.pop("tags", [])

        journal_entry = JournalEntry.objects.create(**validated_data)

        user = self.context["request"].user
        tag_instances = []

        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(
                user=user,
                name=tag_name,
            )
            tag_instances.append(tag)

        journal_entry.tags.set(tag_instances)

        return journal_entry

    def update(self, instance, validated_data):
        tags_data = validated_data.pop("tags", None)

        instance = super().update(instance, validated_data)

        if tags_data is not None:
            user = self.context["request"].user
            tag_instances = []

            for tag_name in tags_data:
                tag, _ = Tag.objects.get_or_create(
                    user=user,
                    name=tag_name,
                )
                tag_instances.append(tag)

            instance.tags.set(tag_instances)

        return instance
