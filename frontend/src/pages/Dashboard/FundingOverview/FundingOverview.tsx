import React from "react";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HardwareIcon from "@mui/icons-material/Hardware";

import { GlowingIconWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  FundingOverviewSection,
  FundingOverviewSectionContent,
  FundingOverviewSectionContentValue,
  FundingOverviewSectionContentValueContainer,
  FundingOverviewSectionContentValueHighlighted,
  FundingOverviewSectionTitle,
  FundingOverviewTitle,
} from "./FundingOverviewStyledComponents";

const FundingOverview: React.FunctionComponent = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
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
            style={{
              color: "#d1d1d1",
              fontSize: 30,
              marginLeft: "auto",
              cursor: "pointer",
            }}
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
            style={{
              color: "#d1d1d1",
              fontSize: 30,
              marginLeft: "auto",
              cursor: "pointer",
            }}
            onClick={() => alert("expand or navigate to eval accounts details")}
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
            style={{
              color: "#d1d1d1",
              fontSize: 30,
              marginLeft: "auto",
              cursor: "pointer",
            }}
            onClick={() => alert("expand or navigate to eval accounts details")}
          />
        </FundingOverviewSectionContent>
        <MobileStepper
          variant="dots"
          steps={6}
          position="static"
          color="white"
          activeStep={activeStep}
          slotProps={{}}
          sx={{
            maxWidth: 400,
            flexGrow: 1,
            background: "transparent",
            "& .MuiMobileStepper-dotActive": {
              backgroundColor: "darkgray",
            },
            marginLeft: "auto",
            marginRight: "auto",
          }}
          nextButton={
            <Button
              style={{ color: "darkgray" }}
              size="small"
              onClick={handleNext}
              disabled={activeStep === 5}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              style={{ color: "darkgray" }}
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </FundingOverviewSection>
    </>
  );
};

export default FundingOverview;
