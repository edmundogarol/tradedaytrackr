# Single source of truth for the trading-day page size, shared between
# TradingDayPagination (the dedicated /api/trading-days/ endpoint) and
# TradingAccountSerializer's embedded first page - these drifting apart
# once already caused the "page 3 unreachable" pagination bug.
TRADING_DAYS_PAGE_SIZE = 10
