# Apex Trader Funding — Intraday Trailing Drawdown PA payout caps.
# Source: https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-payouts/
# Max payout amount per sequential payout number, by account size.
# A PA is limited to 6 total payouts; after that it is closed.
APEX_MAX_PAYOUTS_PER_ACCOUNT = 6

APEX_MAX_PAYOUT_BY_SIZE = {
    25000: [1000, 1000, 1000, 1000, 1000, 1000],
    50000: [1500, 2000, 2500, 2500, 3000, 3000],
    100000: [2000, 2500, 3000, 3000, 4000, 4000],
    150000: [2500, 3000, 3000, 4000, 4000, 5000],
}
