from rest_framework import serializers

from backend.djangoapi.models.rule import Rule


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = [
            "id",
            "name",
            "rule_type",
            "value",
            "description",
        ]
