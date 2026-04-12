import os
import random
from collections import defaultdict

import pytz
from django.conf import settings
from django.db.models import Q

from backend.djangoapi.models.journal_entry import JournalEntry
from backend.djangoapi.models.trade import Trade

image_paths = [
    "dev/trade1.png",
    "dev/trade2.png",
    "dev/trade3.png",
    "dev/trade4.png",
    "dev/trade5.png",
]


def seed_demo_journal_entries(user):
    user_tz = pytz.timezone(user.timezone)
    # ---------------------------------
    # GET FLEX ACCOUNTS ONLY
    # ---------------------------------
    flex_accounts = user.trading_accounts.filter(
        Q(template__name__icontains="Flex")
        & Q(template__name__icontains="MyFundedFutures")
    )

    if flex_accounts.count() < 3:
        return  # not enough accounts

    flex_accounts = flex_accounts[:3]

    # ---------------------------------
    # GROUP TRADES BY DAY
    # ---------------------------------
    trades_by_day = defaultdict(list)

    trades = Trade.objects.filter(account__in=flex_accounts).order_by("date_time")

    for trade in trades:
        local_dt = trade.date_time.astimezone(user_tz)
        day = local_dt.date()
        trades_by_day[day].append(trade)

    # only take last 5 days
    sorted_days = sorted(trades_by_day.keys())[-5:]

    descriptions = [
        "Price delivered cleanly from HTF bias after sweeping liquidity. Strong displacement confirmed intent and retrace into 50% IFVG offered a mechanical entry. All accounts executed cleanly and reached target.",
        "HTF bias was present but execution lacked momentum. Weak displacement and choppy retracement led to failed continuation and full stop out.",
        "Clear liquidity sweep followed by strong displacement. Clean retrace into IFVG allowed precise execution across all accounts.",
        "Setup met criteria but lacked follow-through. Immediate reversal after entry resulted in controlled loss.",
        "Strong narrative with clean sweep and displacement. High-quality retracement entry with disciplined execution across accounts.",
    ]

    tag_sets = [
        ["sweep"],
        ["messy"],
        ["displacement"],
        ["loss"],
        ["clean"],
    ]

    # ---------------------------------
    # CREATE JOURNAL ENTRIES
    # ---------------------------------
    for i, day in enumerate(sorted_days):
        day_trades = trades_by_day[day]

        # ensure exactly 3 trades (one per account)
        if len(day_trades) < 3:
            continue

        selected_trades = day_trades[:3]

        # derive fields from trades
        outcome = sum(t.pnl for t in selected_trades) / len(selected_trades)
        total_pnl = sum(t.pnl for t in selected_trades)

        journal = JournalEntry.objects.create(
            user=user,
            date_time=selected_trades[0].date_time,
            instrument="ES",
            risk=200 if total_pnl > 0 else 100,
            contracts=2 if total_pnl > 0 else 1,
            outcome=outcome,
            description=descriptions[i],
        )

        # attach image
        img_path = random.choice(image_paths)
        full_path = os.path.join(settings.WEB_APP_URL, img_path)
        journal.image = full_path
        journal.save(update_fields=["image"])

        journal.trades.set(selected_trades)

        # attach tags
        tags = tag_sets[i]
        tag_instances = []
        for tag_name in tags:
            tag, _ = user.tags.get_or_create(name=tag_name)
            tag_instances.append(tag)

        journal.tags.set(tag_instances)

    apex_accounts = user.trading_accounts.filter(Q(template__name__icontains="Apex"))

    if apex_accounts.exists():
        apex_trades = Trade.objects.filter(account__in=apex_accounts).order_by(
            "date_time"
        )

        if apex_trades.exists():
            apex_trades_by_day = defaultdict(list)

            for trade in apex_trades:
                local_dt = trade.date_time.astimezone(user_tz)
                day = local_dt.date()
                apex_trades_by_day[day].append(trade)

            latest_day = sorted(apex_trades_by_day.keys())[-1]
            latest_trades = apex_trades_by_day[latest_day]

            if latest_trades:
                base_time = latest_trades[0].date_time

                # shift time so it doesn't match flex entries
                local_base = base_time.astimezone(user_tz)
                local_apex = local_base.replace(hour=7, minute=23, second=0)
                apex_time = local_apex.astimezone(pytz.UTC)

                total_pnl = sum(t.pnl for t in latest_trades)
                outcome = total_pnl / len(latest_trades)

                journal = JournalEntry.objects.create(
                    user=user,
                    date_time=apex_time,
                    instrument="ES",
                    risk=200 if total_pnl > 0 else 100,
                    contracts=2 if total_pnl > 0 else 1,
                    outcome=outcome,
                    description="Apex execution day. Controlled execution with adherence to rules.",
                )

                # attach image
                img_path = random.choice(image_paths)
                full_path = os.path.join(settings.WEB_APP_URL, img_path)
                journal.image = full_path
                journal.save(update_fields=["image"])
                journal.trades.set(latest_trades)

                tag, _ = user.tags.get_or_create(name="apex")
                journal.tags.set([tag])
