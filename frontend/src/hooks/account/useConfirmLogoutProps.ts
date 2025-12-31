import { useState } from "react";
import useLogoutHandler from "@pages/Login/hooks/useLogoutHandler";

export const useConfirmLogout = () => {
  const logout = useLogoutHandler();
  const [open, setOpen] = useState(false);

  const dialogProps = {
    title: "Are you sure?",
    description: "You are about to log out.",
    open,
    buttons: [
      {
        label: "Cancel",
        onClick: () => setOpen(false),
      },
      {
        label: "Logout",
        onClick: () => {
          setOpen(false);
          logout();
        },
      },
    ],
  };

  return {
    openDialog: () => setOpen(true),
    dialogProps,
  };
};
