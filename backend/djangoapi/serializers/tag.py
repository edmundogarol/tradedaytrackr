from rest_framework import serializers

from backend.djangoapi.models.tag import Tag


class TagSerializer(serializers.ModelSerializer):
    uses = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tag
        fields = ["id", "name", "uses"]
