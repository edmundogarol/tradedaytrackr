import { useState } from "react";
import useLogoutHandler from "@pages/Login/hooks/useLogoutHandler";

export const useConfirmLogout = (): {
  openDialog: () => void;
  dialogProps: {
    title: string;
    description: string;
    open: boolean;
    buttons: {
      label: string;
      onClick: () => void;
    }[];
  };
} => {
  const logout = useLogoutHandler();
  const [open, setOpen] = useState(false);

  const dialogProps = {
    title: "Are you sure?",
    description: "You are about to log out.",
    open,
    buttons: [
      {
        label: "Cancel",
        onClick: (): void => setOpen(false),
      },
      {
        label: "Logout",
        onClick: (): void => {
          setOpen(false);
          logout();
        },
      },
    ],
  };

  return {
    openDialog: (): void => setOpen(true),
    dialogProps,
  };
};
