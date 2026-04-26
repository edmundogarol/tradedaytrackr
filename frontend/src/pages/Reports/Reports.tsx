import AlertPopout from "@components/Alert/AlertPopout";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Page from "@components/Page/Page";
import useJournalDispatch from "@pages/Journal/hooks/useJournalDispatch";
import {
  PageContainer,
  Section,
  SectionTitle,
} from "@styles/globalStyledComponents";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useGetReportHandler from "./hooks/useGetReportHandler";
import useCalendarDispatch from "./hooks/useReportsDispatch";
import {
  default as useCalendarState,
  default as useReportsState,
} from "./hooks/useReportsState";
import ReportsStatsBar from "./ReportsStatsBar";

const Reports: React.FunctionComponent = () => {
  const { reportData } = useReportsState();
  const { updateFundedView } = useJournalDispatch();
  const { reportDataErrors } = useCalendarState();
  const { updateReportDataErrors } = useCalendarDispatch();
  const [calendarPickerOpen, setCalendarPickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment(moment.now()));
  const { getReport } = useGetReportHandler();

  useEffect(() => {
    getReport();
  }, []);

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
        <SectionTitle>Reports</SectionTitle>
        <Section>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <ReportsStatsBar data={reportData.overview} />
              <Gap level={1} />
            </GlassTileChildrenWrapper>
          </GlassTile>
        </Section>
      </PageContainer>
    </Page>
  );
};

export default Reports;
