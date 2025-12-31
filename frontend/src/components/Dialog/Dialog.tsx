import { If } from "@components/If/If";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MuiDialog from "@mui/material/Dialog";

interface DialogProps {
  title: string;
  description?: string;
  open: boolean;
  handleClose?: () => void;
  buttons?: {
    label: string;
    onClick: () => void;
  }[];
}

const Dialog: React.FunctionComponent<DialogProps> = ({
  title,
  description,
  open,
  handleClose,
  buttons,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <If condition={!!description}>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </If>
      </DialogContent>
      <DialogActions>
        {buttons?.map((button, index) => (
          <Button onClick={button.onClick} key={index}>
            {button.label}
          </Button>
        ))}
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
