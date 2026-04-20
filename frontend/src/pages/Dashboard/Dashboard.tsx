import CalendarSummary from "@components/Calendar/CalendarSummary/CalendarSummary";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import { FormControlLabel, Switch } from "@mui/material";
import useGetDashboardStatsSummaryDetails from "@pages/Dashboard/FundingOverview/hooks/useGetDashboardStatsSummaryDetails";
import useJournalDispatch from "@pages/Journal/hooks/useJournalDispatch";
import useJournalState from "@pages/Journal/hooks/useJournalState";
import { HorizontalSection, SectionText } from "@styles/globalStyledComponents";
import React, { useEffect } from "react";
import {
  CalendarContainer,
  Container,
  DashboardContentOtherContainer,
  JournalEntriesContainer,
  LeftContainer,
  RightContainer,
  SectionHeader,
  TopSection,
} from "./DashboardStyledComponents";
import FundingOverview from "./FundingOverview/FundingOverview";
import UpcomingPayoutDetails from "./UpcomingPayoutDetails/UpcomingPayoutDetails";
import useGetDashboardSummariesHandler from "./hooks/useGetDashboardSummariesHandler";

const Dashboard: React.FunctionComponent = () => {
  const { fundedView } = useJournalState();
  const { updateFundedView } = useJournalDispatch();
  const dashboardStatsSummaryDetails = useGetDashboardStatsSummaryDetails();
  const { getDashboardSummaries } = useGetDashboardSummariesHandler();

  useEffect(() => {
    getDashboardSummaries();
  }, []);

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
          <HorizontalSection>
            <SectionHeader>Recent Activity</SectionHeader>
            <FormControlLabel
              control={<Switch color="primary" checked={fundedView} />}
              value={fundedView}
              label={
                <SectionText>
                  {fundedView ? "Funded Stats" : "Eval Stats"}
                </SectionText>
              }
              labelPlacement="end"
              onChange={() => updateFundedView(!fundedView)}
            />
          </HorizontalSection>
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
          <CalendarSummary />
        </CalendarContainer>
        <DashboardContentOtherContainer></DashboardContentOtherContainer>
      </Container>
    </Page>
  );
};

export default Dashboard;
