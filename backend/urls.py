from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

from backend.djangoapi import views
from backend.djangoapi.views.account.reset_password import (
    RequestPasswordResetViewSet,
    SubmitPasswordResetViewSet,
    VerifyPasswordResetViewSet,
)
from backend.djangoapi.views.account.verify_account import (
    RequestVerificationViewSet,
    VerifyAccountViewSet,
)
from backend.djangoapi.views.webhooks.whop import (
    WhopMembershipActivatedWebhookView,
    WhopMembershipDeactivatedWebhookView,
)

schema_view = get_swagger_view(title="TradeDayTrackR API")


class TradeDayTrackRApi(routers.APIRootView):
    """
    Test and run TDTR django rest api endpoints viewer
    """

    pass


def home(request):
    return HttpResponse("API is running")


class DocumentedRouter(routers.DefaultRouter):
    APIRootView = TradeDayTrackRApi


router = DocumentedRouter()
router.register(r"user", views.account.UserViewSet)

urlpatterns = [
    path("docs/", schema_view),
    path("api/", include(router.urls)),
    path("api/login/", views.account.LoginViewSet.as_view()),
    path("api/logout/", views.account.LogoutViewSet.as_view()),
    path("api/email-preferences/", views.account.EmailPreferencesView.as_view()),
    path(
        "api/verify-account/",
        VerifyAccountViewSet.as_view({"post": "create"}),
    ),
    path(
        "api/request-verification/",
        RequestVerificationViewSet.as_view({"post": "create"}),
    ),
    path(
        "api/request-password-reset/",
        RequestPasswordResetViewSet.as_view({"post": "create"}),
    ),
    path(
        "api/verify-password-reset/",
        VerifyPasswordResetViewSet.as_view({"post": "create"}),
    ),
    path(
        "api/submit-password-reset/",
        SubmitPasswordResetViewSet.as_view({"post": "create"}),
    ),
    path(
        "api/webhooks/whop/membership_activated",
        WhopMembershipActivatedWebhookView.as_view(),
    ),
    path(
        "api/webhooks/whop/membership_deactivated",
        WhopMembershipDeactivatedWebhookView.as_view(),
    ),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
    path("", home),
]
