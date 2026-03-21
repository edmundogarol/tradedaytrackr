from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

from backend.djangoapi import views
from backend.djangoapi.views.account.verify_account import (
    RequestVerificationViewSet,
    VerifyAccountViewSet,
)

schema_view = get_swagger_view(title="TradeDayTrackR API")


class TradeDayTrackRApi(routers.APIRootView):
    """
    Test and run TDTR django rest api endpoints viewer
    """

    pass


class DocumentedRouter(routers.DefaultRouter):
    APIRootView = TradeDayTrackRApi


router = DocumentedRouter()
router.register(r"user", views.account.UserViewSet)
router.register(
    r"reset-password", views.account.ResetPasswordViewSet, basename="reset-password"
)

urlpatterns = [
    path("docs/", schema_view),
    path("api/", include(router.urls)),
    path("api/login/", views.account.LoginViewSet.as_view()),
    path("api/logout/", views.account.LogoutViewSet.as_view()),
    path(
        "api/verify-account/",
        VerifyAccountViewSet.as_view({"post": "create"}),
    ),
    path(
        "api/request-verification/",
        RequestVerificationViewSet.as_view({"post": "create"}),
    ),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
    re_path(r"^.*$", views.ReactAppView.as_view(), name="react-app"),
]
