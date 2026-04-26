import AlertPopout from "@components/Alert/AlertPopout";
import DateFilter from "@components/DateFilter/DateFilter";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Page from "@components/Page/Page";
import { Box, Stack, Typography } from "@mui/material";
import useJournalDispatch from "@pages/Journal/hooks/useJournalDispatch";
import { color } from "@styles/colors";
import {
  HorizontalSection,
  PageContainer,
  Section,
  SectionTitle,
} from "@styles/globalStyledComponents";
import { formatter } from "@utils/utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useGetReportHandler from "./hooks/useGetReportHandler";
import useCalendarDispatch, {
  useReportsDispatch,
} from "./hooks/useReportsDispatch";
import useReportsState from "./hooks/useReportsState";
import { ReportDataType } from "./ReportsState";
import ReportsStatsBar from "./ReportsStatsBar";

const COLORS = ["#22c55e", "#4ade80", "#f87171", "#ef4444"];

const Reports: React.FunctionComponent = () => {
  const {
    reportData,
    reportDataStartDate,
    reportDataEndDate,
    reportDataErrors,
    reportSelectedRangeType,
  } = useReportsState();
  const { updateReportCoverage } = useReportsDispatch();
  const { updateFundedView } = useJournalDispatch();

  const { updateReportDataErrors } = useCalendarDispatch();
  const [calendarPickerOpen, setCalendarPickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment(moment.now()));
  const { getReport } = useGetReportHandler();

  const data = [
    { name: "Big Wins", value: reportData.pnlDistribution.bigWins },
    { name: "Small Wins", value: reportData.pnlDistribution.smallWins },
    { name: "Small Losses", value: reportData.pnlDistribution.smallLosses },
    { name: "Big Losses", value: reportData.pnlDistribution.bigLosses },
  ];

  const totalTrades = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    getReport();
  }, [reportDataStartDate, reportDataEndDate]);

  const getReportRangeTitle = (): string => {
    if (reportSelectedRangeType === "today") {
      return "Today's Report";
    } else if (reportSelectedRangeType === "week") {
      return "This Week's Report";
    } else if (reportSelectedRangeType === "month") {
      return "This Month's Report";
    } else {
      return "Custom Range Report";
    }
  };

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        hideDuration={3000}
        open={!!reportDataErrors?.detail || !!reportDataErrors?.error}
        message={
          (reportDataErrors?.detail || reportDataErrors?.error) as string
        }
        setPopoutOpen={() => updateReportDataErrors({})}
      />
      <PageContainer>
        <HorizontalSection>
          <SectionTitle>{getReportRangeTitle()}</SectionTitle>
          <DateFilter
            selectedRangeType={reportSelectedRangeType}
            onDateChange={(start, end, rangeType) => {
              if (!start || !end) return;

              updateReportCoverage({
                start: start?.format("YYYY-MM-DD") || "",
                end: end?.format("YYYY-MM-DD") || "",
                type: ReportDataType.Trade,
              });
            }}
          />
        </HorizontalSection>
        <Section>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <ReportsStatsBar />
              <Gap level={1} />
              <HorizontalSection>
                <Box height={300} padding={3} flex={0.5}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reportData.equityCurve}>
                      <defs>
                        <linearGradient
                          id="pnlGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={color("SystemLightGreen")}
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor={color("SystemLightGreen")}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <XAxis
                        dataKey="date"
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        interval="equidistantPreserveStart"
                        tickFormatter={(date) => moment(date).format("MMM D")}
                      />

                      <YAxis
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        tickFormatter={(value) => {
                          if (value >= 1000) {
                            return `$${(value / 1000).toFixed(1)}k`;
                          }
                          return `$${value}`;
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          background: "#808fa449",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 8,
                          color: "#fff",
                        }}
                        labelFormatter={(value) =>
                          moment(value).format("MMMM D, YYYY")
                        }
                        formatter={(value) =>
                          !!value ? formatter.format(Number(value)) : ""
                        }
                      />

                      <Area
                        type="monotone"
                        dataKey="equity"
                        stroke={color("SystemLightGreen")}
                        strokeWidth={2}
                        fill="url(#pnlGradient)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={3}
                  padding={3}
                  flex={0.5}
                >
                  {/* Donut */}
                  <Box width={180} height={180}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data}
                          innerRadius={60}
                          outerRadius={80}
                          dataKey="value"
                          stroke="none"
                        >
                          {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Center text */}
                    <Box position="relative" top="-120px" textAlign="center">
                      <Typography
                        sx={{ color: color("SystemLabel1"), fontSize: 14 }}
                        variant="h6"
                      >
                        {totalTrades}
                      </Typography>
                      <Typography variant="caption" color="gray">
                        Trades
                      </Typography>
                    </Box>
                  </Box>

                  {/* Legend */}
                  <Stack spacing={1}>
                    {data.map((item, index) => (
                      <Box
                        key={item.name}
                        display="flex"
                        justifyContent="space-between"
                        gap={2}
                      >
                        <Typography
                          sx={{ color: color("SystemLabel1"), fontSize: 14 }}
                        >
                          <span
                            style={{ color: COLORS[index], marginRight: 5 }}
                          >
                            ●
                          </span>{" "}
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{ color: color("SystemLabel1"), fontSize: 14 }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </HorizontalSection>
            </GlassTileChildrenWrapper>
          </GlassTile>
        </Section>
      </PageContainer>
    </Page>
  );
};

export default Reports;
