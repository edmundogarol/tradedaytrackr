from datetime import datetime, timedelta

import pytz

from backend.djangoapi.models.trade import Trade


class ReportQueryBuilder:
    def __init__(self, user, filters):
        self.user = user
        self.filters = filters

    def build(self):
        qs = Trade.objects.filter(account__user=self.user)

        report_type = self.filters.get("type")

        start_date = self.filters.get("start")
        end_date = self.filters.get("end")

        # ACCOUNT REPORT
        if report_type in ["fundedAccount", "evaluationAccount"]:
            account_ids = self._parse_ids("account_ids")
            if account_ids:
                qs = qs.filter(account_id__in=account_ids)

        # TRADE REPORT
        elif report_type == "trade":
            pass  # all trades

        # JOURNAL REPORT (UPDATED)
        elif report_type == "journalEntry":
            qs = qs.filter(journal_entry__isnull=False)

        # COMMON DATE FILTER (applies to ALL types)
        # start/end come in as bare "YYYY-MM-DD" strings representing days
        # in the user's own timezone, not UTC - localize them (rather than
        # comparing naive datetimes against a tz-aware field, which Django
        # only warns about and otherwise treats as UTC). The end date is
        # inclusive of the whole day, not just its midnight instant.
        user_tz = pytz.timezone(self.user.timezone)

        if start_date:
            start = user_tz.localize(datetime.fromisoformat(start_date))
            qs = qs.filter(date_time__gte=start)

        if end_date:
            end = user_tz.localize(datetime.fromisoformat(end_date)) + timedelta(
                days=1
            )
            qs = qs.filter(date_time__lt=end)

        # TAG FILTER
        if self.filters.get("tags"):
            qs = qs.filter(tags__name__in=self.filters.getlist("tags")).distinct()

        return qs.select_related("account", "journal_entry").prefetch_related(
            "journal_entry__tags"
        )

    def _parse_ids(self, key):
        raw = self.filters.get(key)
        if not raw:
            return []
        return [int(x) for x in raw.split(",")]
