import React from "react";
import GlassTile from "@components/GlassTile/GlassTile";
import PaidIcon from "@mui/icons-material/Paid";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { GlowingIconWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styled from "styled-components";
import Collapse from "@mui/material/Collapse";
import { Else, If } from "@components/If/If";
import {
  UpcomingPayoutDetailsContainer,
  UpcomingPayoutDetailsFeature,
  UpcomingPayoutDetailsFeatureContentContainer,
  UpcomingPayoutDetailsFeatureContentProgressBarContainer,
  UpcomingPayoutDetailsFeatureContentProgressBarDrilldown,
  UpcomingPayoutDetailsFeatureContentProgressBarDrilldownContainer,
  UpcomingPayoutDetailsFeatureContentProgressBarDrilldownSubtext,
  UpcomingPayoutDetailsFeatureContentProgressBarDrilldownSubtextHighlighted,
  UpcomingPayoutDetailsFeatureContentProgressBarLabel,
  UpcomingPayoutDetailsFeatureContentSubtext,
  UpcomingPayoutDetailsFeatureContentSubtitle,
  UpcomingPayoutDetailsFeatureContentValue,
  UpcomingPayoutDetailsFeatureTitle,
  UpcomingPayoutDetailsHeaderNote,
  UpcomingPayoutDetailsHeaderNoteContainer,
  UpcomingPayoutDetailsHeaderNoteSlash,
  UpcomingPayoutDetailsHeaderNoteText,
  UpcomingPayoutDetailsHeaderNoteTextHighlighted,
} from "./UpcomingPayoutDetailsStyledComponents";
import styles from "./UpcomingPayoutDetailsStyles";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#404f5e",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#86c169",
  },
}));

const UpcomingPayoutDetails: React.FunctionComponent = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <UpcomingPayoutDetailsContainer>
      <UpcomingPayoutDetailsFeature>
        <UpcomingPayoutDetailsFeatureTitle>
          <GlowingIconWrapper $positive $size={42}>
            <PaidIcon />
          </GlowingIconWrapper>
          Upcoming Payout Details
          <UpcomingPayoutDetailsHeaderNoteContainer>
            <UpcomingPayoutDetailsHeaderNoteSlash>
              /
            </UpcomingPayoutDetailsHeaderNoteSlash>
            <UpcomingPayoutDetailsHeaderNote>
              <UpcomingPayoutDetailsHeaderNoteText>
                {"Due in"}
                <UpcomingPayoutDetailsHeaderNoteTextHighlighted>
                  5
                </UpcomingPayoutDetailsHeaderNoteTextHighlighted>
                {"days"}
              </UpcomingPayoutDetailsHeaderNoteText>
            </UpcomingPayoutDetailsHeaderNote>
          </UpcomingPayoutDetailsHeaderNoteContainer>
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
                Projected Payout Date: Dec 7
              </UpcomingPayoutDetailsFeatureContentSubtitle>
            </div>
            <UpcomingPayoutDetailsFeatureContentProgressBarDrilldownContainer>
              <UpcomingPayoutDetailsFeatureContentProgressBarContainer>
                <UpcomingPayoutDetailsFeatureContentProgressBarLabel>
                  3
                </UpcomingPayoutDetailsFeatureContentProgressBarLabel>
                <BorderLinearProgress
                  variant="determinate"
                  value={30}
                  style={styles.progressBar}
                />
              </UpcomingPayoutDetailsFeatureContentProgressBarContainer>
              <UpcomingPayoutDetailsFeatureContentProgressBarDrilldown>
                <UpcomingPayoutDetailsFeatureContentProgressBarDrilldownSubtext>
                  <Collapse
                    orientation="horizontal"
                    in={!checked}
                    collapsedSize={0}
                    onClick={() =>
                      !checked ? setChecked(!checked) : setChecked(checked)
                    }
                  >
                    {8}
                  </Collapse>
                  <UpcomingPayoutDetailsFeatureContentProgressBarDrilldownSubtextHighlighted>
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
                      {"Apex: Min 8 days"}
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
                  </UpcomingPayoutDetailsFeatureContentProgressBarDrilldownSubtextHighlighted>
                </UpcomingPayoutDetailsFeatureContentProgressBarDrilldownSubtext>
              </UpcomingPayoutDetailsFeatureContentProgressBarDrilldown>
            </UpcomingPayoutDetailsFeatureContentProgressBarDrilldownContainer>
          </UpcomingPayoutDetailsFeatureContentContainer>
        </GlassTile>
      </UpcomingPayoutDetailsFeature>
    </UpcomingPayoutDetailsContainer>
  );
};

export default UpcomingPayoutDetails;
