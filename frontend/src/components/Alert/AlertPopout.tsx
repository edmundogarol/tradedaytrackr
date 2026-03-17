import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

interface AlertPopoutProps {
  open: boolean;
  message: string;
  setPopoutOpen?: () => void;
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
      onClose={() => setPopoutOpen && setPopoutOpen()}
    />
  );
};

export default AlertPopout;
