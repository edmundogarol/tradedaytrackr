import { PageEnum } from "@interfaces/NavigationTypes";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import HardwareIcon from "@mui/icons-material/Hardware";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import { color } from "@styles/colors";
import { formatter } from "@utils/utils";
import { useState } from "react";
import type { FundingOverviewSectionProps } from "../FundingOverviewSection";

export const useGetFundingOverviewDetails =
  (): FundingOverviewSectionProps[] => {
    const { dashboardSummaries } = useFundedAccountsState();
    const navigation = useReactNavigation();
    const [activeStep, setActiveStep] = useState(0);
    const evaluationsProgress =
      (dashboardSummaries.evaluations.passed /
        dashboardSummaries.evaluations.total) *
      100;
    const bufferGroups = dashboardSummaries.buffer.groups;
    const currentBufferProgress = !!bufferGroups[activeStep]
      ? ((bufferGroups[activeStep]?.minBuffer -
          bufferGroups[activeStep]?.bufferLeft) /
          bufferGroups[activeStep]?.minBuffer) *
        100
      : 0;

    const handleNext = (): void => {
      if (activeStep > bufferGroups.length - 1) return;
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (): void => {
      if (activeStep === 0) return;
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return [
      {
        title: "Total Active Funding",
        icon: (
          <AssuredWorkloadIcon style={{ color: color("SystemLightGreen") }} />
        ),
        highlightedValue: `${formatter.format(dashboardSummaries.fundingOverview.totalActiveFunding)}`,
        subtext: Object.keys(dashboardSummaries.fundingOverview.firms)
          .map(
            (firm) =>
              `${dashboardSummaries.fundingOverview.firms[firm]} x ${firm}`,
          )
          .join(", "),
        buttonAction: (): void => {
          navigation.navigate(PageEnum.FundedAccounts);
        },
      },
      {
        title: "Evaluations Passed",
        icon: (
          <StickyNote2Icon
            style={{
              color:
                evaluationsProgress > 50
                  ? color("SystemLightGreen")
                  : "#a8a8a8",
            }}
          />
        ),
        highlightedValue: `${dashboardSummaries.evaluations.passed} / ${dashboardSummaries.evaluations.total}`,
        highlightedValuePositive: evaluationsProgress > 50,
        subtext: "View eval accounts",
        buttonAction: (): void => {
          navigation.navigate(PageEnum.EvaluationAccounts);
        },
      },
      {
        title: "Buffer Progress",
        icon: (
          <HardwareIcon
            style={{
              color:
                currentBufferProgress > 60
                  ? color("SystemLightGreen")
                  : color("SystemRed"),
            }}
          />
        ),
        highlightedValuePositive: currentBufferProgress > 60,
        highlightedValue: !!bufferGroups[activeStep]
          ? `${formatter.format(bufferGroups[activeStep]?.minBuffer - bufferGroups[activeStep]?.bufferLeft)} / ${formatter.format(bufferGroups[activeStep]?.minBuffer)}`
          : "N/A",
        subtext: !!bufferGroups[activeStep]
          ? `on ${bufferGroups[activeStep]?.accountCount} ${bufferGroups[activeStep]?.firms.join(", ")} accounts`
          : "",
        buttonAction: (): void => {
          navigation.navigate(PageEnum.FundedAccounts);
        },
        footer: (
          <MobileStepper
            variant="dots"
            steps={bufferGroups.length}
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
                disabled={activeStep === bufferGroups.length - 1}
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
        ),
      },
    ];
  };

export default useGetFundingOverviewDetails;
