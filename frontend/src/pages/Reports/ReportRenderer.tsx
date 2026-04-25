import { If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import type { CalendarDay } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useJournalState from "@pages/Journal/hooks/useJournalState";
import { formatter, m } from "@utils/utils";
import moment from "moment";
import React, { useMemo } from "react";
import {
  CalendarGrid,
  DayCell,
  DayHeaderCell,
} from "./ReportsStyledComponents";
import useReportsState from "./hooks/useReportsState";

interface ReportRendererProps {
  date?: moment.Moment;
}

const ReportRenderer: React.FunctionComponent<ReportRendererProps> = ({
  date,
}) => {
  const navigation = useReactNavigation();
  const { reportData } = useReportsState();
  const { fundedView } = useJournalState();
  const today = date || moment();
  const startOfMonth = today.clone().startOf("month");
  const endOfMonth = today.clone().endOf("month");

  const calendarSummary = reportData?.calendarSummary;

  const dataMap = useMemo(() => {
    const map: Record<string, CalendarDay> = {};
    calendarSummary?.daily.forEach((d: any) => {
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

        const weekCells = week.map((day, idx) => {
          if (!day) return <div key={`${weekIdx}-${idx}`} />;

          const key = m(day).format("YYYY-MM-DD");
          const entry = dataMap[key];

          const pnl = fundedView ? entry?.pnl || 0 : entry?.evalPnl || 0;
          weeklyTotal += pnl;

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
          return (
            <DayCell $bg={bg} key={key}>
              <If condition={entry?.journals > 0}>
                <InfoPopout
                  infoDescription={`Journal Entry on ${day.format("MMM D, YYYY")} - ${formatter.format(journalPnl as number)} [${journalAccountCount} accounts]`}
                >
                  <VisibilityOutlinedIcon
                    style={{ color: "#e0e0e0a6" }}
                    onClick={() =>
                      navigation.navigate(PageEnum.JournalEntry, {
                        id: entry.journalEntries[0].id,
                      })
                    }
                  />
                </InfoPopout>
              </If>
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
          </DayCell>
        );

        return [...weekCells, weeklyCell];
      })}
    </CalendarGrid>
  );
};

export default ReportRenderer;
