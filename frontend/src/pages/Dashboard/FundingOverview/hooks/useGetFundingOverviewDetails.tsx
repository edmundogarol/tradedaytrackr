import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import HardwareIcon from "@mui/icons-material/Hardware";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useState } from "react";
import type { FundingOverviewSectionProps } from "../FundingOverviewSection";

export const useGetFundingOverviewDetails =
  (): FundingOverviewSectionProps[] => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = (): void => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (): void => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return [
      {
        title: "Total Active Funding",
        icon: <AssuredWorkloadIcon style={{ color: "#95d395" }} />,
        highlightedValue: "$350,000",
        subtext: "2 x Apex, 2 x MFFU, 2 x Bulenox",
        buttonAction: () =>
          console.log("expand or navigate to funded accounts details"),
      },
      {
        title: "Evaluations Passed",
        icon: <StickyNote2Icon style={{ color: "#95d395" }} />,
        highlightedValue: "3 / 5",
        subtext: "View eval accounts",
        buttonAction: () =>
          console.log("expand or navigate to eval accounts details"),
      },
      {
        title: "Buffer Progress",
        icon: <HardwareIcon style={{ color: "#95d395" }} />,
        highlightedValue: "$320 / $2600",
        subtext: "Left on 3 Apex Funded Accounts",
        buttonAction: () =>
          console.log("expand or navigate to funded accounts details"),
        footer: (
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
        ),
      },
    ];
  };

export default useGetFundingOverviewDetails;
