from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models.tag import Tag
from backend.djangoapi.serializers.tag import TagSerializer


class TagViewSet(ModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Tag.objects.filter(user=self.request.user)
            .annotate(uses=Count("journal_entries"))
            .order_by("-id")
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
