"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

from backend.djangoapi import views

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
        views.account.VerifyAccountViewSet.as_view({"post": "email"}),
    ),
    path(
        "api/request-verification/",
        views.account.RequestVerificationViewSet.as_view({"post": "email"}),
    ),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
    re_path(r"^.*$", views.ReactAppView.as_view(), name="react-app"),
]
