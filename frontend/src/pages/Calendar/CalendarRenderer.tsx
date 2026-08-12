import { If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import type { CalendarDay } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import PaidIcon from "@mui/icons-material/Paid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useJournalState from "@pages/Journal/hooks/useJournalState";
import { formatter } from "@utils/utils";
import moment from "moment";
import React, { useMemo } from "react";
import {
  CalendarGrid,
  DayCell,
  DayCellIcons,
  DayHeaderCell,
} from "./CalendarStyledComponents";
import useCalendarState from "./hooks/useCalendarState";

interface CalendarRendererProps {
  date?: moment.Moment;
}

const CalendarRenderer: React.FunctionComponent<CalendarRendererProps> = ({
  date,
}) => {
  const navigation = useReactNavigation();
  const { calendarSummary } = useCalendarState();
  const { fundedView } = useJournalState();
  const today = date || moment();
  const startOfMonth = today.clone().startOf("month");
  const endOfMonth = today.clone().endOf("month");

  const dataMap = useMemo(() => {
    const map: Record<string, CalendarDay> = {};
    calendarSummary.daily.forEach((d) => {
      map[d.date] = d;
    });
    return map;
  }, [calendarSummary, date]);

  const weeks = useMemo(() => {
    const result: (moment.Moment | null)[][] = [];
    let week: (moment.Moment | null)[] = [];

    const startDay = startOfMonth.day();

    // leading nulls
    for (let i = 0; i < startDay; i++) {
      week.push(null);
    }

    let current = startOfMonth.clone();

    while (current.isSameOrBefore(endOfMonth)) {
      week.push(current.clone());

      if (week.length === 7) {
        result.push(week);
        week = [];
      }

      current.add(1, "day");
    }

    // trailing nulls
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      result.push(week);
    }

    return result;
  }, [startOfMonth, endOfMonth, calendarSummary, date]);

  return (
    <CalendarGrid>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Week Total"].map(
        (d) => (
          <DayHeaderCell key={d}>{d}</DayHeaderCell>
        ),
      )}

      {weeks.flatMap((week, weekIdx) => {
        let weeklyTotal = 0;
        let weeklyPayoutTotal = 0;

        const weekCells = week.map((day, idx) => {
          if (!day) return <div key={`${weekIdx}-${idx}`} />;

          // day is already the exact calendar date for this cell - no
          // timezone conversion needed (or wanted) to build the lookup key.
          const key = day.format("YYYY-MM-DD");
          const entry = dataMap[key];

          const pnl = fundedView ? entry?.pnl || 0 : entry?.evalPnl || 0;
          weeklyTotal += pnl;

          // Payouts only apply to funded accounts, not eval accounts.
          const payoutTotal = fundedView ? entry?.payoutTotal || 0 : 0;
          weeklyPayoutTotal += payoutTotal;

          const bg =
            pnl > 0
              ? "rgba(0, 200, 0, 0.15)"
              : pnl < 0
                ? "rgba(255, 0, 0, 0.15)"
                : "transparent";

          const journalEntry = entry?.journalEntries?.[0];
          const journalPnl = fundedView
            ? journalEntry?.totalPnl
            : journalEntry?.totalEvalPnl;
          const journalAccountCount = fundedView
            ? journalEntry?.accountCount
            : journalEntry?.evalAccountCount;
          const payouts = payoutTotal > 0 ? entry?.payouts || [] : [];
          const payoutDescription = payouts
            .map(
              (p) =>
                `${formatter.format(p.amount)} - ${p.accountName} (${p.firm})`,
            )
            .join(" · ");

          return (
            <DayCell $bg={bg} key={key}>
              <DayCellIcons>
                <If condition={entry?.journals > 0}>
                  <InfoPopout
                    infoDescription={`Journal Entry on ${day.format("MMM D, YYYY")} - ${formatter.format(journalPnl as number)} [${journalAccountCount} accounts]`}
                  >
                    <VisibilityOutlinedIcon
                      style={{ color: "#e0e0e0a6", fontSize: 18 }}
                      onClick={() =>
                        navigation.navigate(PageEnum.JournalEntry, {
                          id: entry.journalEntries[0].id,
                        })
                      }
                    />
                  </InfoPopout>
                </If>
                <If condition={payoutTotal > 0}>
                  <InfoPopout
                    infoDescription={`Payout on ${day.format("MMM D, YYYY")} - ${payoutDescription}`}
                  >
                    <PaidIcon style={{ color: "#f0c14b", fontSize: 18 }} />
                  </InfoPopout>
                </If>
              </DayCellIcons>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{day.date()}</div>

              {entry && (
                <div style={{ fontSize: 11 }}>
                  <div style={{ color: pnl >= 0 ? "#4caf50" : "#ff5252" }}>
                    {pnl >= 0 ? "+" : ""}
                    {formatter.format(pnl)}
                  </div>
                  <div style={{ opacity: 0.6 }}>
                    {fundedView ? entry.trades : entry.evalTrades} trades
                  </div>
                  {payoutTotal > 0 && (
                    <div style={{ color: "#f0c14b" }}>
                      -{formatter.format(payoutTotal)} payout
                    </div>
                  )}
                </div>
              )}
            </DayCell>
          );
        });

        // Weekly summary cell
        const weeklyCell = (
          <DayCell key={`week-total-${weekIdx}`}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Σ</div>
            <div
              style={{
                fontSize: 12,
                color: weeklyTotal >= 0 ? "#4caf50" : "#ff5252",
              }}
            >
              {weeklyTotal >= 0 ? "+" : ""}
              {formatter.format(weeklyTotal)}
            </div>
            {weeklyPayoutTotal > 0 && (
              <div style={{ fontSize: 11, color: "#f0c14b" }}>
                -{formatter.format(weeklyPayoutTotal)} payout
              </div>
            )}
          </DayCell>
        );

        return [...weekCells, weeklyCell];
      })}
    </CalendarGrid>
  );
};

export default CalendarRenderer;
