import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import CalendarSummary, {
  CalendarSummaryCount,
} from "@components/Calendar/CalendarSummary/CalendarSummary";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HardwareIcon from "@mui/icons-material/Hardware";

import { GlowingIconWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import {
  DashboardContainer,
  DashboardContentCalendarContainer,
  DashboardContentHeader,
  DashboardContentJournalEntryContainer,
  DashboardContentOtherContainer,
  DashboardTopSectionContainer,
  DashboardTopSectionLeftContainer,
  DashboardTopSectionRightContainer,
  FundingOverviewSection,
  FundingOverviewSectionContent,
  FundingOverviewSectionContentValue,
  FundingOverviewSectionContentValueContainer,
  FundingOverviewSectionContentValueHighlighted,
  FundingOverviewSectionTitle,
  FundingOverviewTitle,
} from "./DashboardStyledComponents";
import UpcomingPayoutDetails from "./UpcomingPayoutDetails/UpcomingPayoutDetails";

const Dashboard: React.FunctionComponent = () => {
  return (
    <Page topBarShowMenu={true}>
      <DashboardContainer>
        <Gap level={4} />
        <DashboardTopSectionContainer>
          <DashboardTopSectionLeftContainer>
            <DashboardContentJournalEntryContainer>
              <UpcomingPayoutDetails />
            </DashboardContentJournalEntryContainer>
            <Gap level={2} />
            <DashboardContentJournalEntryContainer>
              <DashboardContentHeader>Current Stats</DashboardContentHeader>
              <StatsSummary />
            </DashboardContentJournalEntryContainer>
          </DashboardTopSectionLeftContainer>
          <DashboardTopSectionRightContainer>
            <FundingOverviewTitle>Funding Overview</FundingOverviewTitle>
            <FundingOverviewSection>
              <FundingOverviewSectionTitle>
                Total Active Funding
              </FundingOverviewSectionTitle>
              <FundingOverviewSectionContent>
                <GlowingIconWrapper $positive $size={30}>
                  <AssuredWorkloadIcon style={{ color: "#95d395" }} />
                </GlowingIconWrapper>
                <FundingOverviewSectionContentValueContainer>
                  <FundingOverviewSectionContentValueHighlighted>
                    ${"350,000"}
                  </FundingOverviewSectionContentValueHighlighted>
                  <FundingOverviewSectionContentValue>
                    {"2 x Apex, 2 x MFFU, 2 x Bulenox"}
                  </FundingOverviewSectionContentValue>
                </FundingOverviewSectionContentValueContainer>
                <ChevronRightIcon
                  style={{ color: "#d1d1d1", fontSize: 30, marginLeft: "auto" }}
                  onClick={() =>
                    alert("expand or navigate to funded accounts details")
                  }
                />
              </FundingOverviewSectionContent>
            </FundingOverviewSection>
            <FundingOverviewSection>
              <FundingOverviewSectionTitle>
                Evaluations Passed
              </FundingOverviewSectionTitle>
              <FundingOverviewSectionContent>
                <GlowingIconWrapper $positive $size={30}>
                  <StickyNote2Icon style={{ color: "#95d395" }} />
                </GlowingIconWrapper>
                <FundingOverviewSectionContentValueContainer>
                  <FundingOverviewSectionContentValueHighlighted>
                    {"3 / 5"}
                  </FundingOverviewSectionContentValueHighlighted>
                  <FundingOverviewSectionContentValue>
                    {"View eval accounts"}
                  </FundingOverviewSectionContentValue>
                </FundingOverviewSectionContentValueContainer>
                <ChevronRightIcon
                  style={{ color: "#d1d1d1", fontSize: 30, marginLeft: "auto" }}
                  onClick={() =>
                    alert("expand or navigate to eval accounts details")
                  }
                />
              </FundingOverviewSectionContent>
            </FundingOverviewSection>
            <FundingOverviewSection>
              <FundingOverviewSectionTitle>
                Buffer Progress
              </FundingOverviewSectionTitle>
              <FundingOverviewSectionContent>
                <GlowingIconWrapper $positive $size={30}>
                  <HardwareIcon style={{ color: "#95d395" }} />
                </GlowingIconWrapper>
                <FundingOverviewSectionContentValueContainer>
                  <FundingOverviewSectionContentValueHighlighted>
                    ${"320 / $2600"}
                  </FundingOverviewSectionContentValueHighlighted>
                  <FundingOverviewSectionContentValue>
                    {"Left on 3 Apex Funded Accounts"}
                  </FundingOverviewSectionContentValue>
                </FundingOverviewSectionContentValueContainer>
                <ChevronRightIcon
                  style={{ color: "#d1d1d1", fontSize: 30, marginLeft: "auto" }}
                  onClick={() =>
                    alert("expand or navigate to eval accounts details")
                  }
                />
              </FundingOverviewSectionContent>
            </FundingOverviewSection>
          </DashboardTopSectionRightContainer>
        </DashboardTopSectionContainer>
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
          <CalendarSummary count={CalendarSummaryCount.TEN_DAYS} />
        </DashboardContentCalendarContainer>
        <DashboardContentOtherContainer>
          {/* <PNLDailyChart /> */}
        </DashboardContentOtherContainer>
      </DashboardContainer>
    </Page>
  );
};

export default Dashboard;
