import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

interface AlertPopoutProps {
  open: boolean;
  message: string;
  setPopoutOpen?: (open: boolean) => void;
  hideDuration?: number;
}

const AlertPopout: React.FC<AlertPopoutProps> = ({
  open,
  message,
  setPopoutOpen,
  hideDuration = 2000,
}) => {
  console.log(
    "AlertPopout rendered with message:",
    message,
    "and open state:",
    open,
  );
  return (
    <Snackbar
      autoHideDuration={hideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      message={message}
      key={"top" + "center"}
      onClose={() => setPopoutOpen && setPopoutOpen(false)}
    />
  );
};

export default AlertPopout;
