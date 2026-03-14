import pytest
from backend.djangoapi.models import JournalEntry, Trade
from backend.djangoapi.serializers.journal_entry import JournalEntrySerializer


@pytest.mark.django_db
def test_journal_entry_total_pnl():

    entry = JournalEntry.objects.create(
        instrument="ES", risk=100, contracts=1, outcome="win", description="test entry"
    )

    Trade.objects.create(journal_entry=entry, pnl=50)

    Trade.objects.create(journal_entry=entry, pnl=-10)

    serializer = JournalEntrySerializer(entry)

    assert serializer.data["totalPnL"] == 40
