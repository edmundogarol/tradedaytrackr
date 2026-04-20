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
from backend.djangoapi.services.demo.seed_payouts import (
    seed_demo_payouts,
    seed_historical_payouts,
)
from backend.djangoapi.services.demo.seed_tags import seed_demo_tags
from backend.djangoapi.services.demo.seed_trade_days import seed_demo_trade_days
from backend.djangoapi.services.demo.seed_trading_accounts import (
    seed_demo_trading_accounts,
)

logger = logging.getLogger(__name__)


def reset_demo_user(user):
    logger.info("Starting demo reset", extra={"user_id": user.id})

    try:
        tz = pytz.timezone(user.timezone)
        logger.info(
            "User timezone resolved", extra={"user_id": user.id, "tz": user.timezone}
        )
    except Exception:
        tz = pytz.UTC
        logger.warning(
            "Invalid timezone, defaulting to UTC", extra={"user_id": user.id}
        )

    dj_timezone.activate(tz)

    with transaction.atomic():
        logger.info("Beginning transactional reset", extra={"user_id": user.id})

        # ---------------------------
        # DELETE MEDIA FILES
        # ---------------------------
        logger.info("Deleting journal entry images", extra={"user_id": user.id})
        for entry in user.journal_entries.all():
            if entry.image and entry.image.name.startswith("journal_entries/"):
                entry.image.delete(save=False)

        logger.info("Deleting template images", extra={"user_id": user.id})
        for template in user.trading_account_templates.all():
            if template.image and template.image.name.startswith(
                "trading_account_templates/"
            ):
                template.image.delete(save=False)

        # ---------------------------
        # DELETE DATA
        # ---------------------------
        logger.info("Deleting user data", extra={"user_id": user.id})
        user.journal_entries.all().delete()
        user.tags.all().delete()
        user.trading_accounts.all().delete()
        user.trading_account_templates.all().delete()

        # ---------------------------
        # RESET USER STATE
        # ---------------------------
        logger.info("Resetting user currency + conversion", extra={"user_id": user.id})
        user.preferred_currency = "USD"
        user.conversion_rate = None
        user.conversion_last_updated = None
        user.save()

        # ---------------------------
        # SEEDING
        # ---------------------------
        logger.info("Seeding account templates", extra={"user_id": user.id})
        seed_demo_account_templates(user)

        logger.info("Seeding tags", extra={"user_id": user.id})
        seed_demo_tags(user)

        logger.info("Seeding trading accounts", extra={"user_id": user.id})
        seed_demo_trading_accounts(user)

        logger.info("Seeding trade days", extra={"user_id": user.id})
        seed_demo_trade_days(user)

        logger.info("Seeding payouts", extra={"user_id": user.id})
        seed_demo_payouts(user)

        logger.info("Seeding historical payouts", extra={"user_id": user.id})
        seed_historical_payouts(user)

        logger.info("Seeding journal entries", extra={"user_id": user.id})
        seed_demo_journal_entries(user)

        logger.info("Seeding complete (within transaction)", extra={"user_id": user.id})

    logger.info("Demo reset fully completed", extra={"user_id": user.id})
