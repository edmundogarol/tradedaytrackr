import InfoOutlineIcon from "@mui/icons-material/InfoOutlined";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import { color } from "@styles/colors";
import { useState } from "react";
import { Container } from "./InfoPopoutStyledComponents";
import styles from "./InfoPopoutStyles";

export interface InfoPopoutProps {
  infoDescription: string;
  children?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  warning?: boolean;
}

const InfoPopout: React.FC<InfoPopoutProps> = ({
  infoDescription,
  children,
  containerStyle,
  warning,
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
        {children ? (
          children
        ) : (
          <InfoOutlineIcon
            style={{
              ...styles.infoIconStyle,
              color: warning ? "orange" : color("SystemGrey1"),
            }}
          />
        )}
      </span>
    </Container>
  );
};

export default InfoPopout;
