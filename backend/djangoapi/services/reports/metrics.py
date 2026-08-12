from collections import defaultdict
from datetime import timedelta
from decimal import Decimal

import pytz


class MetricsEngine:
    def __init__(self, trades, timezone=None):
        # sorted for equity + streaks
        self.trades = sorted(list(trades), key=lambda t: t.date_time)
        # date_time is stored in UTC; grouping/labeling by calendar day must
        # use the user's own timezone, not UTC's, or late-day trades land on
        # the wrong day.
        self.tz = pytz.timezone(timezone) if timezone else pytz.UTC

    def _local(self, dt):
        return dt.astimezone(self.tz)

    # =========================
    # OVERVIEW
    # =========================
    def overview(self):
        total_trades = len(self.trades)
        if total_trades == 0:
            # Fully-shaped zero state, not {} - the frontend always expects
            # these fields (e.g. an empty "Today" range shouldn't crash
            # rendering the stats bar).
            return {
                "total_pnl": 0.0,
                "pnl_percentage": None,
                "win_rate": 0,
                "total_trades": 0,
                "profit_factor": None,
                "expectancy": 0.0,
                "avg_win": 0.0,
                "avg_loss": 0.0,
            }

        wins = [t for t in self.trades if t.pnl > 0]
        losses = [t for t in self.trades if t.pnl < 0]

        total_pnl = sum(t.pnl for t in self.trades)

        win_rate = (
            Decimal(len(wins)) / Decimal(total_trades) if total_trades else Decimal("0")
        )

        gross_profit = sum(t.pnl for t in wins)
        gross_loss = abs(sum(t.pnl for t in losses))

        # Undefined (not 0) when there are no losing trades to divide by -
        # 0 reads as "bad" when a lack of losses is actually as good as it
        # gets, and matches how pnl_percentage already handles this below.
        profit_factor = (gross_profit / gross_loss) if gross_loss != 0 else None

        avg_win = gross_profit / len(wins) if wins else Decimal("0")
        avg_loss = gross_loss / len(losses) if losses else Decimal("0")

        expectancy = (win_rate * avg_win) - ((Decimal("1") - win_rate) * avg_loss)

        return {
            "total_pnl": float(total_pnl),
            "pnl_percentage": (float(total_pnl) / abs(float(gross_loss)))
            if gross_loss != 0
            else None,
            "win_rate": round(win_rate, 4),
            "total_trades": total_trades,
            "profit_factor": float(profit_factor) if profit_factor is not None else None,
            "expectancy": float(expectancy),
            "avg_win": float(avg_win),
            "avg_loss": float(avg_loss),
        }

    # =========================
    # EQUITY CURVE
    # =========================
    def equity_curve(self):
        equity = Decimal("0")
        # One point per calendar day (the running total as of that day's
        # last trade), not one point per trade - multiple same-day trades
        # used to emit multiple points stamped with the same date, which
        # rendered as duplicate/overlapping x-axis entries.
        daily_equity: dict = {}
        daily_pnl: dict = defaultdict(Decimal)

        for t in self.trades:
            equity += t.pnl
            day = self._local(t.date_time).date()
            daily_equity[day] = float(equity)
            daily_pnl[day] += t.pnl

        return [
            {"date": day, "equity": eq, "pnl": float(daily_pnl[day])}
            for day, eq in daily_equity.items()
        ]

    # =========================
    # PNL DISTRIBUTION
    # =========================
    def distribution(self):
        if not self.trades:
            return {}

        pnls = [t.pnl for t in self.trades]

        avg = sum(pnls) / len(pnls)

        big_wins = len([p for p in pnls if p > avg and p > 0])
        small_wins = len([p for p in pnls if 0 < p <= avg])
        small_losses = len([p for p in pnls if avg <= p < 0])
        big_losses = len([p for p in pnls if p < avg and p < 0])

        return {
            "big_wins": big_wins,
            "small_wins": small_wins,
            "small_losses": small_losses,
            "big_losses": big_losses,
        }

    # =========================
    # PERFORMANCE BY DAY
    # =========================
    def performance_by_day(self):
        days = defaultdict(Decimal)

        for t in self.trades:
            day_name = self._local(t.date_time).strftime("%a")
            days[day_name] += t.pnl

        # keep order consistent
        ordered_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

        return [{"day": d, "pnl": float(days.get(d, 0))} for d in ordered_days]

    # =========================
    # RISK (REAL DRAWDOWN)
    # =========================
    def risk(self):
        if not self.trades:
            return {}

        equity = Decimal("0")
        peak = Decimal("0")
        max_drawdown = Decimal("0")

        for t in self.trades:
            equity += t.pnl
            peak = max(peak, equity)

            drawdown = peak - equity
            max_drawdown = max(max_drawdown, drawdown)

        total_pnl = sum(t.pnl for t in self.trades)

        recovery_factor = (
            (total_pnl / max_drawdown) if max_drawdown != 0 else Decimal("0")
        )

        return {
            "max_drawdown": float(max_drawdown),
            "recovery_factor": float(recovery_factor),
        }

    # =========================
    # STREAKS + KEY STATS
    # =========================
    def streaks(self):
        if not self.trades:
            return {}

        max_win_streak = 0
        max_loss_streak = 0

        current_win = 0
        current_loss = 0

        best_trade = max(self.trades, key=lambda t: t.pnl).pnl
        worst_trade = min(self.trades, key=lambda t: t.pnl).pnl

        durations = []

        for t in self.trades:
            # streak logic
            if t.pnl > 0:
                current_win += 1
                current_loss = 0
            elif t.pnl < 0:
                current_loss += 1
                current_win = 0

            max_win_streak = max(max_win_streak, current_win)
            max_loss_streak = max(max_loss_streak, current_loss)

            # duration (if you later add entry/exit)
            if hasattr(t, "entry_time") and hasattr(t, "exit_time"):
                if t.entry_time and t.exit_time:
                    durations.append(t.exit_time - t.entry_time)

        avg_duration = (
            sum(durations, timedelta()) / len(durations) if durations else None
        )

        return {
            "best_trade": float(best_trade),
            "worst_trade": float(worst_trade),
            "max_consecutive_wins": max_win_streak,
            "max_consecutive_losses": max_loss_streak,
            "avg_trade_duration_seconds": avg_duration.total_seconds()
            if avg_duration
            else None,
        }
