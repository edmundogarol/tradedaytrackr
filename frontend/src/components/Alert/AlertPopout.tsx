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
