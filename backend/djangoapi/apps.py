from django.apps import AppConfig


class DjangoapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.djangoapi"

    def ready(self):
        import backend.djangoapi.signals.trade  # noqa: F401
        import backend.djangoapi.signals.user  # noqa: F401
