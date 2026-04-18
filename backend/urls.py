from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

from backend.djangoapi import views
from backend.djangoapi.views import csrf
from backend.djangoapi.views.account.currency import RefreshConversionRateView
from backend.djangoapi.views.account.reset_password import (
    RequestPasswordResetViewSet,
    SubmitPasswordResetViewSet,
    VerifyPasswordResetViewSet,
)
from backend.djangoapi.views.account.user import UserViewSet
from backend.djangoapi.views.account.verify_account import (
    RequestVerificationViewSet,
    VerifyAccountViewSet,
)
from backend.djangoapi.views.ai.drafting import GenerateDraftView
from backend.djangoapi.views.ai.strategy import DetectStrategyView
from backend.djangoapi.views.ai.tagging import AutoTagView
from backend.djangoapi.views.dashboard.dashboard_summaries import DashboardSummariesView
from backend.djangoapi.views.journal.journal_entry import JournalEntryViewSet
from backend.djangoapi.views.journal.journal_entry_by_date import (
    JournalEntriesByDateView,
)
from backend.djangoapi.views.journal.tag import TagViewSet
from backend.djangoapi.views.trades.payout import (
    RecordPayoutView,
    UpdatePayoutView,
)
from backend.djangoapi.views.trades.payout_list import PayoutListView
from backend.djangoapi.views.trades.trade import TradeViewSet
from backend.djangoapi.views.trades.trade_by_date import TradesByDateView
from backend.djangoapi.views.tradingAccount.rule import RuleViewSet
from backend.djangoapi.views.tradingAccount.trading_account import (
    TradingAccountArchivedViewSet,
    TradingAccountViewSet,
)
from backend.djangoapi.views.tradingAccount.trading_account_template import (
    TradingAccountTemplateViewSet,
)
from backend.djangoapi.views.views import health_check
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
router.register(r"user", UserViewSet, basename="user")
router.register(r"journal-entries", JournalEntryViewSet, basename="journal-entries")
router.register(r"trading-accounts", TradingAccountViewSet, basename="trading-accounts")
router.register(
    r"trading-accounts-archived",
    TradingAccountArchivedViewSet,
    basename="trading-accounts-archived",
)
router.register(
    r"trading-account-templates",
    TradingAccountTemplateViewSet,
    basename="trading-account-templates",
)
router.register(r"tags", TagViewSet, basename="tags")
router.register(r"rules", RuleViewSet, basename="rules")
router.register(r"trades", TradeViewSet, basename="trades")

urlpatterns = [
    path("docs/", schema_view),
    path("health/", health_check),
    path("api/user/refresh-currency/", RefreshConversionRateView.as_view()),
    path("api/dashboard/summaries/", DashboardSummariesView.as_view()),
    path("api/payouts/list/", PayoutListView.as_view()),
    path(
        "api/payouts/",
        RecordPayoutView.as_view(),
        name="payouts",
    ),
    path("api/payouts/<int:payout_id>/", UpdatePayoutView.as_view()),
    path(
        "api/journal-entries/by-date/",
        JournalEntriesByDateView.as_view(),
        name="journal-entries-by-date",
    ),
    path("api/trades/by-date/", TradesByDateView.as_view(), name="trades-by-date"),
    path("api/", include(router.urls)),
    path("api/csrf/", csrf),
    path("api/ai/tags/", AutoTagView.as_view()),
    path("api/ai/strategy/", DetectStrategyView.as_view()),
    path("api/ai/generate-draft/", GenerateDraftView.as_view()),
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
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
