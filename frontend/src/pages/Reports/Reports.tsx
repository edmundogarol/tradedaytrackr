import AlertPopout from "@components/Alert/AlertPopout";
import DateFilter from "@components/DateFilter/DateFilter";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Page from "@components/Page/Page";
import useJournalDispatch from "@pages/Journal/hooks/useJournalDispatch";
import {
  HorizontalSection,
  PageContainer,
  Section,
  SectionTitle,
} from "@styles/globalStyledComponents";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useGetReportHandler from "./hooks/useGetReportHandler";
import useCalendarDispatch, {
  useReportsDispatch,
} from "./hooks/useReportsDispatch";
import useReportsState from "./hooks/useReportsState";
import { ReportDataType } from "./ReportsState";
import ReportsStatsBar from "./ReportsStatsBar";

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
            onDateChange={(start, end) => {
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
            </GlassTileChildrenWrapper>
          </GlassTile>
        </Section>
      </PageContainer>
    </Page>
  );
};

export default Reports;
