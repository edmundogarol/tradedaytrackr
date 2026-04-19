import GlassTile from "@components/GlassTile/GlassTile";
import { GlowingIconWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { Else, If } from "@components/If/If";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PaidIcon from "@mui/icons-material/Paid";
import Collapse from "@mui/material/Collapse";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import { BorderLinearProgress } from "@styles/globalStyledComponents";
import { formatter, m } from "@utils/utils";
import React from "react";
import {
  Container,
  Feature,
  FeatureContentContainer,
  FeatureContentProgressBarContainer,
  FeatureContentProgressBarDrilldown,
  FeatureContentProgressBarDrilldownContainer,
  FeatureContentProgressBarDrilldownSubtext,
  FeatureContentProgressBarDrilldownSubtextHighlighted,
  FeatureContentProgressBarLabel,
  FeatureContentSubtext,
  FeatureContentSubtitle,
  FeatureContentValue,
  FeatureTitle,
  HeaderNote,
  HeaderNoteContainer,
  HeaderNoteSlash,
  HeaderNoteText,
  HeaderNoteTextHighlighted,
} from "./UpcomingPayoutDetailsStyledComponents";
import styles from "./UpcomingPayoutDetailsStyles";

const UpcomingPayoutDetails: React.FunctionComponent = () => {
  const [checked, setChecked] = React.useState(false);
  const { dashboardSummaries } = useFundedAccountsState();

  return (
    <Container>
      <Feature>
        <FeatureTitle>
          <GlowingIconWrapper $positive $size={42}>
            <PaidIcon />
          </GlowingIconWrapper>
          Upcoming Payout Details
          <HeaderNoteContainer>
            <HeaderNoteSlash>/</HeaderNoteSlash>
            <HeaderNote>
              <HeaderNoteText>
                {"Due in"}
                <HeaderNoteTextHighlighted
                  $closeToPayout={
                    dashboardSummaries.upcomingPayout.daysRemaining <= 2
                  }
                >
                  {dashboardSummaries.upcomingPayout.daysRemaining}
                </HeaderNoteTextHighlighted>
                {"days"}
              </HeaderNoteText>
            </HeaderNote>
          </HeaderNoteContainer>
        </FeatureTitle>
        <GlassTile positive featureTile>
          <FeatureContentContainer>
            <div>
              <FeatureContentValue>
                {formatter.format(
                  dashboardSummaries.upcomingPayout.expected || 0,
                )}
                <FeatureContentSubtext>Available</FeatureContentSubtext>
              </FeatureContentValue>
              <FeatureContentSubtitle>
                {`Next Projected Payout Date: ${!!dashboardSummaries.upcomingPayout.projectedDate ? m(dashboardSummaries.upcomingPayout.projectedDate).format("MMM D") : "N/A"}`}
              </FeatureContentSubtitle>
            </div>
            <FeatureContentProgressBarDrilldownContainer>
              <FeatureContentProgressBarContainer>
                <FeatureContentProgressBarLabel>
                  {dashboardSummaries.upcomingPayout.daysCompleted || 0}
                </FeatureContentProgressBarLabel>
                <BorderLinearProgress
                  $bufferPercent={100}
                  variant="determinate"
                  value={
                    dashboardSummaries.upcomingPayout.daysCompleted >
                    dashboardSummaries.upcomingPayout.minDays
                      ? 100
                      : (dashboardSummaries.upcomingPayout.daysCompleted /
                          dashboardSummaries.upcomingPayout.minDays) *
                        100
                  }
                  style={styles.progressBar}
                />
              </FeatureContentProgressBarContainer>
              <FeatureContentProgressBarDrilldown>
                <FeatureContentProgressBarDrilldownSubtext>
                  <Collapse
                    orientation="horizontal"
                    in={!checked}
                    collapsedSize={0}
                    onClick={() =>
                      !checked ? setChecked(!checked) : setChecked(checked)
                    }
                  >
                    {dashboardSummaries.upcomingPayout.minDays}
                  </Collapse>
                  <FeatureContentProgressBarDrilldownSubtextHighlighted>
                    <Collapse
                      orientation="horizontal"
                      in={!checked}
                      collapsedSize={0}
                      onClick={() =>
                        !checked ? setChecked(!checked) : setChecked(checked)
                      }
                    >
                      {"Minimum"}
                    </Collapse>
                    <Collapse
                      orientation="horizontal"
                      in={checked}
                      collapsedSize={0}
                      style={{
                        textWrap: "nowrap",
                        textTransform: "capitalize",
                      }}
                      onClick={() =>
                        !checked ? setChecked(checked) : setChecked(!checked)
                      }
                    >
                      {`${dashboardSummaries.upcomingPayout.firmName}: Min ${dashboardSummaries.upcomingPayout.minDays} days`}
                    </Collapse>
                    <If condition={!checked}>
                      <ChevronLeftIcon
                        style={{ height: 19 }}
                        onClick={() => setChecked(!checked)}
                      />
                      <Else>
                        <ChevronRightIcon
                          style={{ height: 19 }}
                          onClick={() => setChecked(!checked)}
                        />
                      </Else>
                    </If>
                  </FeatureContentProgressBarDrilldownSubtextHighlighted>
                </FeatureContentProgressBarDrilldownSubtext>
              </FeatureContentProgressBarDrilldown>
            </FeatureContentProgressBarDrilldownContainer>
          </FeatureContentContainer>
        </GlassTile>
      </Feature>
    </Container>
  );
};

export default UpcomingPayoutDetails;
