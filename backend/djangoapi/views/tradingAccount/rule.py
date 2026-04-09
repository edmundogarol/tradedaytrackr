from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models.rule import Rule
from backend.djangoapi.serializers.rule import RuleSerializer


class RuleViewSet(ModelViewSet):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]
