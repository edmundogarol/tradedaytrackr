from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.models.trading_account_template import TradingAccountTemplate


def seed_demo_trading_accounts(user):

    flex_template = TradingAccountTemplate.objects.get(
        name="MyFundedFutures 50k Flex (Sample)",
        user=user,
    )
    rapid_template = TradingAccountTemplate.objects.get(
        name="MyFundedFutures 50k Rapid (Sample)",
        user=user,
    )
    apex_template = TradingAccountTemplate.objects.get(
        name="Apex 50k EOD (Sample)",
        user=user,
    )

    accounts = [
        {
            "account_name": "MFFUSFFLX001",
            "account_balance": 50000,
            "template_id": flex_template.id,
        },
        {
            "account_name": "MFFUSFRPD001",
            "account_balance": 50000,
            "template_id": rapid_template.id,
        },
        {
            "account_name": "PAAPEX003",
            "account_balance": 50000,
            "template_id": apex_template.id,
        },
    ]

    for account in accounts:
        TradingAccount.objects.create(user=user, **account)
