from collections import defaultdict
from datetime import timedelta
from decimal import Decimal


class MetricsEngine:
    def __init__(self, trades):
        # sorted for equity + streaks
        self.trades = sorted(list(trades), key=lambda t: t.date_time)

    # =========================
    # OVERVIEW
    # =========================
    def overview(self):
        total_trades = len(self.trades)
        if total_trades == 0:
            return {}

        wins = [t for t in self.trades if t.pnl > 0]
        losses = [t for t in self.trades if t.pnl < 0]

        total_pnl = sum(t.pnl for t in self.trades)

        win_rate = (
            Decimal(len(wins)) / Decimal(total_trades) if total_trades else Decimal("0")
        )

        gross_profit = sum(t.pnl for t in wins)
        gross_loss = abs(sum(t.pnl for t in losses))

        profit_factor = (gross_profit / gross_loss) if gross_loss != 0 else Decimal("0")

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
            "profit_factor": float(profit_factor),
            "expectancy": float(expectancy),
            "avg_win": float(avg_win),
            "avg_loss": float(avg_loss),
        }

    # =========================
    # EQUITY CURVE
    # =========================
    def equity_curve(self):
        equity = Decimal("0")
        curve = []

        for t in self.trades:
            equity += t.pnl
            curve.append(
                {
                    "date": t.date_time.date(),
                    "equity": float(equity),
                }
            )

        return curve

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
            day_name = t.date_time.strftime("%a")
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
