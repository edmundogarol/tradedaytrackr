import pytest
from django.utils import timezone
from django.contrib.auth import get_user_model

from backend.djangoapi.models import (
    JournalEntry,
    Trade,
    TradingAccount,
    TradingAccountTemplate,
)
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer

User = get_user_model()


@pytest.mark.django_db
def test_journal_entry_total_pnl():

    user = User.objects.create_user(email="test@test.com", password="password")

    template = TradingAccountTemplate.objects.create(
        name="Test Template",
        firm="Test Firm",
        account_size=100000,
        is_evaluation=False,
        profit_target=10000,
        min_trading_days=5,
        min_day_pnl=100,
    )

    account = TradingAccount.objects.create(
        user=user, template=template, account_name="Test Account", account_balance=10000
    )

    entry = JournalEntry.objects.create(
        user=user,
        date_time=timezone.now(),
        instrument="ES",
        risk=100,
        contracts=1,
        outcome=1,
        description="test entry",
    )

    Trade.objects.create(
        journal_entry=entry, account=account, date_time=timezone.now(), pnl=50
    )

    Trade.objects.create(
        journal_entry=entry, account=account, date_time=timezone.now(), pnl=-10
    )

    serializer = JournalEntrySerializer(entry)

    assert serializer.data["totalPnL"] == 40
