import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export const useGetDrawerItems = (): Array<{
  text: string;
  icon: React.ReactElement;
  onClick: () => void;
}> => {
  const drawerItems = React.useMemo(
    () => [
      {
        text: "Inbox",
        icon: <InboxIcon />,
        onClick: (): void => console.log("Inbox"),
      },
      {
        text: "Starred",
        icon: <MailIcon />,
        onClick: (): void => console.log("Starred"),
      },
      {
        text: "Send email",
        icon: <InboxIcon />,
        onClick: (): void => console.log("Send"),
      },
      {
        text: "Drafts",
        icon: <MailIcon />,
        onClick: (): void => console.log("Drafts"),
      },
    ],
    []
  );

  return drawerItems;
};
