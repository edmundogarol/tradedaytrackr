from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from rest_framework import routers

from backend.djangoapi import views
from backend.djangoapi.views import csrf
from backend.djangoapi.views.account.currency import (
    RefreshConversionRateView,
    UpdateCurrencyView,
)
from backend.djangoapi.views.account.user import UserViewSet
from backend.djangoapi.views.dashboard.dashboard_summaries import DashboardSummariesView
from backend.djangoapi.views.journal.journal_entry import JournalEntryViewSet
from backend.djangoapi.views.journal.journal_entry_by_date import (
    JournalEntriesByDateView,
)
from backend.djangoapi.views.journal.tag import TagViewSet
from backend.djangoapi.views.payout.monthly_payout_summaries import (
    MonthlyPayoutSummariesView,
)
from backend.djangoapi.views.reports.report import ReportView
from backend.djangoapi.views.trades.calendar import CalendarSummaryView
from backend.djangoapi.views.trades.payout import (
    RecordPayoutView,
    UpdatePayoutView,
)
from backend.djangoapi.views.trades.payout_list import PayoutListView
from backend.djangoapi.views.trades.trade import TradeViewSet
from backend.djangoapi.views.trades.trade_by_date import TradesByDateView
from backend.djangoapi.views.trades.trade_day import TradingDayViewSet
from backend.djangoapi.views.tradingAccount.rule import RuleViewSet
from backend.djangoapi.views.tradingAccount.trading_account import (
    TradingAccountArchivedViewSet,
    TradingAccountViewSet,
)
from backend.djangoapi.views.tradingAccount.trading_account_template import (
    TradingAccountTemplateViewSet,
)
from backend.djangoapi.views.views import health_check


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
router.register(r"trading-days", TradingDayViewSet, basename="trading-days")

urlpatterns = [
    path("health/", health_check),
    path("api/reports/", ReportView.as_view()),
    path("api/calendar-summary/", CalendarSummaryView.as_view()),
    path("api/user/currency/", UpdateCurrencyView.as_view()),
    path("api/user/refresh-currency/", RefreshConversionRateView.as_view()),
    path("api/monthly-payout-summaries/", MonthlyPayoutSummariesView.as_view()),
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
    path("api/login/", views.account.LoginViewSet.as_view()),
    path("api/logout/", views.account.LogoutViewSet.as_view()),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
    path("", home),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
