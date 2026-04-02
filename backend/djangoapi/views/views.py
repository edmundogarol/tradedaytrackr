from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView


class ReactAppView(TemplateView):
    template_name = "base.html"


@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"detail": "CSRF set"})
