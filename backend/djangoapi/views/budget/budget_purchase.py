from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from backend.djangoapi.models.budget_purchase import BudgetPurchase
from backend.djangoapi.serializers.budget_purchase import BudgetPurchaseSerializer


class BudgetPurchaseViewSet(ModelViewSet):
    serializer_class = BudgetPurchaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BudgetPurchase.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
