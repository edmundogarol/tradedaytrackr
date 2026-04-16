import logging

import pytz
from django.db import transaction
from django.utils import timezone as dj_timezone

from backend.djangoapi.services.demo.seed_account_templates import (
    seed_demo_account_templates,
)
from backend.djangoapi.services.demo.seed_journal_entries import (
    seed_demo_journal_entries,
)
from backend.djangoapi.services.demo.seed_tags import seed_demo_tags
from backend.djangoapi.services.demo.seed_trade_days import seed_demo_trade_days
from backend.djangoapi.services.demo.seed_trading_accounts import (
    seed_demo_trading_accounts,
)

logger = logging.getLogger(__name__)


def reset_demo_user(user):
    logger.info("Resetting demo user data.", extra={"user_id": user.id})
    try:
        tz = pytz.timezone(user.timezone)
    except Exception:
        tz = pytz.UTC

    dj_timezone.activate(tz)

    with transaction.atomic():
        # DELETE ONLY journal_entries + templates files
        for entry in user.journal_entries.all():
            if entry.image and entry.image.name.startswith("journal_entries/"):
                entry.image.delete(save=False)

        for template in user.trading_account_templates.all():
            if template.image and template.image.name.startswith(
                "trading_account_templates/"
            ):
                template.image.delete(save=False)

        user.journal_entries.all().delete()
        user.tags.all().delete()
        user.trading_accounts.all().delete()
        user.trading_account_templates.all().delete()

        seed_demo_account_templates(user)
        seed_demo_tags(user)
        seed_demo_trading_accounts(user)
        seed_demo_trade_days(user)
        seed_demo_journal_entries(user)

    logger.info("Demo user reset + seeded.", extra={"user_id": user.id})
