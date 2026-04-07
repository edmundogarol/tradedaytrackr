from backend.djangoapi.models import TradingAccountTemplate


def seed_demo_account_templates(user):
    templates = [
        {
            "name": "Apex EOD",
            "firm": "Apex",
            "account_size": 50000,
            "is_evaluation": True,
            "icon": "apex",
            "profit_target": "3000.00",
            "profit_split": "100.00",
            "min_buffer": "2600.00",
            "min_trading_days": 5,
            "min_day_pnl": "50.00",
            "max_drawdown": "2000.00",
            "consistency": "0.00",
            "allowable_payout_request": "1.00",
        },
        {
            "name": "MyFundedFutures Rapid",
            "firm": "MyFundedFutures",
            "account_size": 50000,
            "is_evaluation": False,
            "icon": "myfundedfutures",
            "profit_target": None,
            "profit_split": "90.00",
            "min_buffer": "2600.00",
            "min_trading_days": 1,
            "min_day_pnl": "200.00",
            "max_drawdown": "2000.00",
            "consistency": "0.00",
            "allowable_payout_request": "1.00",
        },
        {
            "name": "MyFundedFutures Flex",
            "firm": "MyFundedFutures",
            "account_size": 50000,
            "is_evaluation": False,
            "icon": "myfundedfutures",
            "profit_target": None,
            "profit_split": "80.00",
            "min_buffer": "250.00",
            "min_trading_days": 5,
            "min_day_pnl": "150.00",
            "max_drawdown": "2000.00",
            "consistency": "0.00",
            "allowable_payout_request": "0.50",
        },
    ]

    for template in templates:
        TradingAccountTemplate.objects.create(user=user, **template)
