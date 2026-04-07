from rest_framework import serializers

from backend.djangoapi.models import Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "uses"]
