import { PageEnum } from "@interfaces/NavigationTypes";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import MenuBook from "@mui/icons-material/MenuBook";
import PaymentsIcon from "@mui/icons-material/Payments";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import React from "react";
export const useGetDrawerItems = (): Array<{
  text: string;
  icon: React.ReactElement;
  onClick: () => void;
}> => {
  const navigation = useReactNavigation();
  const drawerItems = React.useMemo(
    () => [
      {
        text: "Dashboard",
        icon: <HomeIcon />,
        onClick: (): void => navigation.navigate(PageEnum.Dashboard),
      },
      {
        text: "Funded Accounts",
        icon: <AssuredWorkloadIcon />,
        onClick: (): void => navigation.navigate(PageEnum.FundedAccounts),
      },
      {
        text: "Evaluation Accounts",
        icon: <StickyNote2Icon />,
        onClick: (): void => navigation.navigate(PageEnum.EvaluationAccounts),
      },
      {
        text: "PnL Calendar",
        icon: <CalendarMonthIcon />,
        onClick: (): void => navigation.navigate(PageEnum.Calendar),
      },
      {
        text: "Payout Tracking",
        icon: <PaymentsIcon />,
        onClick: (): void => navigation.navigate(PageEnum.PayoutTracking),
      },
      {
        text: "Journal",
        icon: <MenuBook />,
        onClick: (): void => navigation.navigate(PageEnum.Journal),
      },
      {
        text: "Reports",
        icon: <AssessmentIcon />,
        onClick: (): void => navigation.navigate(PageEnum.Reports),
      },
    ],
    [],
  );

  return drawerItems;
};
