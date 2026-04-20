from django.contrib import admin

from backend.djangoapi.models.rule import Rule
from backend.djangoapi.models.user import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "email",
        "is_active",
        "is_staff",
        "is_superuser",
        "last_ip",
        "is_verified",
        "date_joined",
        "last_login",
    ]
    search_fields = ["email", "first_name", "last_name"]


@admin.register(Rule)
class RuleAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "rule_type", "value"]
    search_fields = ["name", "rule_type"]
