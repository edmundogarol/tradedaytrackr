import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import CalendarSummary, {
  CalendarSummaryCount,
} from "@components/Calendar/CalendarSummary/CalendarSummary";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import GlassTile from "@components/GlassTile/GlassTile";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { GlowingIconWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import {
  DashboardContainer,
  DashboardContentCalendarContainer,
  DashboardContentHeader,
  DashboardContentJournalEntryContainer,
  DashboardContentOtherContainer,
  UpcomingPayoutDetailsContainer,
  UpcomingPayoutDetailsFeature,
  UpcomingPayoutDetailsFeatureContentContainer,
  UpcomingPayoutDetailsFeatureContentSubtext,
  UpcomingPayoutDetailsFeatureContentSubtitle,
  UpcomingPayoutDetailsFeatureContentValue,
  UpcomingPayoutDetailsFeatureTitle,
} from "./DashboardStyledComponents";

const Dashboard: React.FunctionComponent = () => {
  return (
    <Page topBarShowMenu={true}>
      <DashboardContainer>
        <Gap level={4} />
        <DashboardContentJournalEntryContainer>
          <UpcomingPayoutDetailsContainer>
            <UpcomingPayoutDetailsFeature>
              <UpcomingPayoutDetailsFeatureTitle>
                <GlowingIconWrapper $positive $size={42}>
                  <LocalAtmIcon />
                </GlowingIconWrapper>
                Upcoming Payout Details
              </UpcomingPayoutDetailsFeatureTitle>
              <GlassTile positive featureTile>
                <UpcomingPayoutDetailsFeatureContentContainer>
                  <div>
                    <UpcomingPayoutDetailsFeatureContentValue>
                      $1,250.00
                      <UpcomingPayoutDetailsFeatureContentSubtext>
                        Expected
                      </UpcomingPayoutDetailsFeatureContentSubtext>
                    </UpcomingPayoutDetailsFeatureContentValue>
                    <UpcomingPayoutDetailsFeatureContentSubtitle>
                      Payout Date: Dec 7
                    </UpcomingPayoutDetailsFeatureContentSubtitle>
                  </div>
                </UpcomingPayoutDetailsFeatureContentContainer>
              </GlassTile>
            </UpcomingPayoutDetailsFeature>
          </UpcomingPayoutDetailsContainer>
        </DashboardContentJournalEntryContainer>
        <Gap level={2} />
        <DashboardContentJournalEntryContainer>
          <DashboardContentHeader>Current Stats</DashboardContentHeader>
          <StatsSummary />
        </DashboardContentJournalEntryContainer>
        <Gap level={2} />
        <DashboardContentCalendarContainer>
          <DashboardContentHeader>Recent Activity</DashboardContentHeader>
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
          <CalendarSummary count={CalendarSummaryCount.FIVE_DAYS} />
        </DashboardContentCalendarContainer>
        <DashboardContentOtherContainer>
          {/* <PNLDailyChart /> */}
        </DashboardContentOtherContainer>
      </DashboardContainer>
    </Page>
  );
};

export default Dashboard;
