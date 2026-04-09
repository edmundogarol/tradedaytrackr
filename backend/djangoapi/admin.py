from django.contrib import admin

from backend.djangoapi.models.rule import Rule


@admin.register(Rule)
class RuleAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "rule_type", "value"]
    search_fields = ["name", "rule_type"]
