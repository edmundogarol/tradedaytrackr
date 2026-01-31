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
                <HeaderNoteTextHighlighted>5</HeaderNoteTextHighlighted>
                {"days"}
              </HeaderNoteText>
            </HeaderNote>
          </HeaderNoteContainer>
        </FeatureTitle>
        <GlassTile positive featureTile>
          <FeatureContentContainer>
            <div>
              <FeatureContentValue>
                $1,250.00
                <FeatureContentSubtext>Expected</FeatureContentSubtext>
              </FeatureContentValue>
              <FeatureContentSubtitle>
                Projected Payout Date: Dec 7
              </FeatureContentSubtitle>
            </div>
            <FeatureContentProgressBarDrilldownContainer>
              <FeatureContentProgressBarContainer>
                <FeatureContentProgressBarLabel>
                  3
                </FeatureContentProgressBarLabel>
                <BorderLinearProgress
                  variant="determinate"
                  value={30}
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
                    {8}
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
