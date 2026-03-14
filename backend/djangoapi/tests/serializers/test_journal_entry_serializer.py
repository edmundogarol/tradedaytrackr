import pytest
from django.utils import timezone
from backend.djangoapi.models import JournalEntry, Trade
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
def test_journal_entry_total_pnl():

    user = User.objects.create_user(email="test@test.com", password="password")

    entry = JournalEntry.objects.create(
        user=user,
        date_time=timezone.now(),
        instrument="ES",
        risk=100,
        contracts=1,
        outcome=1,
        description="test entry",
    )

    Trade.objects.create(journal_entry=entry, pnl=50)
    Trade.objects.create(journal_entry=entry, pnl=-10)

    serializer = JournalEntrySerializer(entry)

    assert serializer.data["totalPnL"] == 40
