import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MenuBook from "@mui/icons-material/MenuBook";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import SpeedIcon from "@mui/icons-material/Speed";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { PageEnum } from "@interfaces/NavigationTypes";

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
        text: "Journal",
        icon: <MenuBook />,
        onClick: (): void => navigation.navigate(PageEnum.Journal),
      },
      {
        text: "Trade Stats",
        icon: <SpeedIcon />,
        onClick: (): void => alert("Trade Stats Coming Soon!"),
      },
    ],
    [],
  );

  return drawerItems;
};
