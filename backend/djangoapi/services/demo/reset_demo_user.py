import logging

from django.db import transaction

from backend.djangoapi.services.demo.seed_account_templates import (
    seed_demo_account_templates,
)
from backend.djangoapi.services.demo.seed_tags import seed_demo_tags
from backend.djangoapi.services.demo.seed_trade_days import seed_demo_trade_days
from backend.djangoapi.services.demo.seed_trading_accounts import (
    seed_demo_trading_accounts,
)

logger = logging.getLogger(__name__)


def reset_demo_user(user):
    logger.info("Resetting demo user data.", extra={"user_id": user.id})

    with transaction.atomic():
        user.journal_entries.all().delete()
        user.tags.all().delete()
        user.trading_accounts.all().delete()
        user.trading_account_templates.all().delete()

        seed_demo_account_templates(user)
        seed_demo_tags(user)
        seed_demo_trading_accounts(user)
        seed_demo_trade_days(user)

    logger.info("Demo user reset + seeded.", extra={"user_id": user.id})
