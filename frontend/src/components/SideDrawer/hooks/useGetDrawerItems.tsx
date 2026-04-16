import { PageEnum } from "@interfaces/NavigationTypes";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import HomeIcon from "@mui/icons-material/Home";
import MenuBook from "@mui/icons-material/MenuBook";
import SpeedIcon from "@mui/icons-material/Speed";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import React from "react";

export const useGetDrawerItems = (): Array<{
  text: string;
  icon: React.ReactElement;
  onClick: () => void;
}> => {
  const navigation = useReactNavigation();
  const { updateSystemAlert } = useSettingsDispatch();
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
        onClick: (): void =>
          updateSystemAlert({ message: "Trade Stats Coming Soon!" }),
      },
    ],
    [],
  );

  return drawerItems;
};
