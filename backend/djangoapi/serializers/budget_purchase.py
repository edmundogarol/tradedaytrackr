from rest_framework import serializers

from backend.djangoapi.models.budget_purchase import BudgetPurchase


class BudgetPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetPurchase
        fields = [
            "id",
            "firm",
            "account_size",
            "cost",
            "purchase_date",
            "notes",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
