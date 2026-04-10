from backend.djangoapi.models import Rule, TradingAccountTemplate


def seed_demo_account_templates(user):
    mffu_rule, _ = Rule.objects.get_or_create(name="MFFU $100 MLL after Payout #1")

    templates = [
        {
            "name": "Apex 50k EOD (Sample)",
            "firm": "Apex",
            "account_size": 50000,
            "is_evaluation": True,
            "icon": "apex",
            "profit_target": "3000.00",
            "profit_split": "0.00",
            "min_buffer": "0.00",
            "min_trading_days": 0,
            "min_day_pnl": "0.00",
            "max_drawdown": "2000.00",
            "consistency": "50.00",
            "min_payout_request": "500.00",
            "max_payout_request": "1500.00",
            "withdrawal_split": "0.00",
        },
        {
            "name": "MyFundedFutures 50k Rapid (Sample)",
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
            "min_payout_request": "500.00",
            "max_payout_request": "0.00",
            "withdrawal_split": "0.00",
        },
        {
            "name": "MyFundedFutures 50k Flex (Sample)",
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
            "min_payout_request": "250.00",
            "max_payout_request": "5000.00",
            "withdrawal_split": "50.00",
        },
        {
            "name": "Apex 50k Funded (Sample)",
            "firm": "Apex",
            "account_size": 50000,
            "is_evaluation": False,
            "icon": "apex",
            "profit_target": None,
            "profit_split": "90.00",
            "min_buffer": "2600.00",
            "min_trading_days": 5,
            "min_day_pnl": "200.00",
            "max_drawdown": "2000.00",
            "consistency": "0.00",
            "min_payout_request": "500.00",
            "max_payout_request": "2000.00",
            "withdrawal_split": "0.00",
        },
    ]

    for template_data in templates:
        template = TradingAccountTemplate.objects.create(user=user, **template_data)

        if "Flex" in template.name:
            template.rules.add(mffu_rule)
