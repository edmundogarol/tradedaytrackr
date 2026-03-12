import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InfoOutlineIcon from "@mui/icons-material/InfoOutlined";
import Popper from "@mui/material/Popper";
import styles from "./InfoPopoutStyles";
import { Container } from "./InfoPopoutStyledComponents";

export interface InfoPopoutProps {
  infoDescription: string;
  children?: React.ReactNode;
  containerStyle?: React.CSSProperties;
}

const InfoPopout: React.FC<InfoPopoutProps> = ({
  infoDescription,
  children,
  containerStyle,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <Container style={containerStyle}>
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement="top-start"
        disablePortal
        sx={{ zIndex: 11, pointerEvents: "auto" }}
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
        {children ? children : <InfoOutlineIcon style={styles.infoIconStyle} />}
      </span>
    </Container>
  );
};

export default InfoPopout;
