import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import CalendarSummary, {
  CalendarSummaryCount,
} from "@components/Calendar/CalendarSummary/CalendarSummary";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import useGetDashboardStatsSummaryDetails from "@pages/Dashboard/FundingOverview/hooks/useGetDashboardStatsSummaryDetails";
import UpcomingPayoutDetails from "./UpcomingPayoutDetails/UpcomingPayoutDetails";
import {
  Container,
  CalendarContainer,
  SectionHeader,
  JournalEntriesContainer,
  DashboardContentOtherContainer,
  TopSection,
  LeftContainer,
  RightContainer,
} from "./DashboardStyledComponents";
import FundingOverview from "./FundingOverview/FundingOverview";

const Dashboard: React.FunctionComponent = () => {
  const dashboardStatsSummaryDetails = useGetDashboardStatsSummaryDetails();
  return (
    <Page topBarShowMenu={true}>
      <Container>
        <Gap level={4} />
        <TopSection>
          <LeftContainer>
            <JournalEntriesContainer>
              <UpcomingPayoutDetails />
            </JournalEntriesContainer>
            <Gap level={2} />
            <JournalEntriesContainer>
              <SectionHeader>Current Stats</SectionHeader>
              <StatsSummary
                statsSummaryTilesDetails={dashboardStatsSummaryDetails}
              />
            </JournalEntriesContainer>
          </LeftContainer>
          <RightContainer>
            <FundingOverview />
          </RightContainer>
        </TopSection>
        <Gap level={2} />
        <CalendarContainer>
          <SectionHeader>Recent Activity</SectionHeader>
          {/* <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                showMark: ({ index }) => index % 2 === 0,
              },
            ]}
            height={300}
          /> */}
          <CalendarSummary count={CalendarSummaryCount.TEN_DAYS} />
        </CalendarContainer>
        <DashboardContentOtherContainer>
          {/* <PNLDailyChart /> */}
        </DashboardContentOtherContainer>
      </Container>
    </Page>
  );
};

export default Dashboard;
