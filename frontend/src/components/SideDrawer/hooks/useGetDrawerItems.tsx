import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MenuBook from "@mui/icons-material/MenuBook";
import Speed from "@mui/icons-material/Speed";
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";

export const useGetDrawerItems = (): Array<{
  text: string;
  icon: React.ReactElement;
  onClick: () => void;
}> => {
  const drawerItems = React.useMemo(
    () => [
      {
        text: "Dashboard",
        icon: <HomeIcon />,
        onClick: (): void => console.log("Dashboard"),
      },
      {
        text: "Journal",
        icon: <MenuBook />,
        onClick: (): void => console.log("Journal"),
      },
      {
        text: "Stats",
        icon: <Speed />,
        onClick: (): void => console.log("Stats"),
      },
      {
        text: "Expense Tracking",
        icon: <AccountBalanceWallet />,
        onClick: (): void => console.log("Expense Tracking"),
      },
    ],
    []
  );

  return drawerItems;
};
