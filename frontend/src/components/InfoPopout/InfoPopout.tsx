import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InfoOutlineIcon from "@mui/icons-material/InfoOutlined";
import Popper from "@mui/material/Popper";
import styles from "./InfoPopoutStyles";

export interface InfoPopoutProps {
  infoDescription: string;
}

const InfoPopout: React.FC<InfoPopoutProps> = ({ infoDescription }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement="top-end"
        disablePortal
        sx={{ zIndex: 1300 }}
      >
        <Paper style={styles.paperStyle}>
          <Typography sx={styles.contentStyle}>{infoDescription}</Typography>
        </Paper>
      </Popper>

      <span
        onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
        onMouseLeave={() => setAnchorEl(null)}
        style={styles.infoIconContainer}
      >
        <InfoOutlineIcon style={styles.infoIconStyle} />
      </span>
    </>
  );
};

export default InfoPopout;
