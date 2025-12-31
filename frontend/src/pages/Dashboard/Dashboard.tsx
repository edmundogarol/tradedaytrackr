import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import CalendarSummary, {
  CalendarSummaryCount,
} from "@components/Calendar/CalendarSummary/CalendarSummary";
import {
  DashboardContainer,
  DashboardContentCalendarContainer,
  DashboardContentHeader,
  DashboardContentJournalEntryContainer,
  DashboardContentOtherContainer,
} from "./DashboardStyledComponents";

const Dashboard: React.FunctionComponent = () => {
  return (
    <Page topBarShowMenu={true}>
      <DashboardContainer>
        <Gap level={4} />
        <DashboardContentJournalEntryContainer>
          <DashboardContentHeader>Current Stats</DashboardContentHeader>
        </DashboardContentJournalEntryContainer>
        <Gap level={2} />
        <DashboardContentCalendarContainer>
          <DashboardContentHeader>Recent Activity</DashboardContentHeader>
          <CalendarSummary count={CalendarSummaryCount.TEN_DAYS} />
        </DashboardContentCalendarContainer>
        <DashboardContentOtherContainer>
          {/* <CalendarSummary count={CalendarSummaryCount.FIVE_DAYS} /> */}
        </DashboardContentOtherContainer>
      </DashboardContainer>
    </Page>
  );
};

export default Dashboard;
