from backend.djangoapi.models.trading_account import TradingAccount
from backend.djangoapi.models.trading_account_template import TradingAccountTemplate


def seed_demo_trading_accounts(user):

    templates = TradingAccountTemplate.objects.filter(user=user)

    accounts = []

    for template in templates:
        name = template.name
        size = template.account_size

        # how many accounts per template
        if "Flex" in name:
            count = 3  # stack flex accounts
        elif "Rapid" in name:
            count = 2
        elif "Apex" in name:
            count = 2
        else:
            count = 1

        for i in range(1, count + 1):
            # ---------------------------
            # FLEX
            # ---------------------------
            if "Flex" in name:
                account_name = f"MFFU-FLX-{size}-{i:03d}"

            # ---------------------------
            # RAPID
            # ---------------------------
            elif "Rapid" in name:
                account_name = f"MFFU-RPD-{size}-{i:03d}"

            # ---------------------------
            # APEX
            # ---------------------------
            elif "Apex" in name:
                suffix = "EVAL" if template.is_evaluation else "FUNDED"
                account_name = f"APEX-{suffix}-{size}-{i:03d}"

            # ---------------------------
            # FALLBACK
            # ---------------------------
            else:
                account_name = f"ACC-{template.id}-{i:03d}"

            accounts.append(
                {
                    "account_name": account_name,
                    "account_balance": size,
                    "template_id": template.id,
                }
            )

    # ---------------------------
    # CREATE ACCOUNTS
    # ---------------------------
    for account in accounts:
        TradingAccount.objects.get_or_create(
            user=user,
            account_name=account["account_name"],
            defaults=account,
        )
