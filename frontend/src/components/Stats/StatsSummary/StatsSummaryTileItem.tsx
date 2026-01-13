import { useState } from "react";
import GlassTile from "@components/GlassTile/GlassTile";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InfoOutlineIcon from "@mui/icons-material/InfoOutlined";
import Popper from "@mui/material/Popper";
import type { StatsSummaryTileDetails } from "./hooks/useGetStatsSummaryTilesDetails";
import {
  StatsSummaryTile,
  StatsSummaryTileActivityDot,
  StatsSummaryTileSubtitle,
  StatsSummaryTileSubtitlePrice,
  StatsSummaryTileTitle,
  StatsSummaryTileValue,
} from "./StatsSummaryStyledComponents";
import styles from "./StatsSummaryStyles";

const StatsSummaryTileItem: React.FC<StatsSummaryTileDetails> = ({
  tileValue,
  tileValueColor,
  tileTitle,
  tileSubtitle,
  infoDescription,
  tileShinePositive,
  tileIcon,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <StatsSummaryTile>
      <GlassTile positive={tileShinePositive}>
        <StatsSummaryTileValue $color={tileValueColor}>
          {tileValue}
        </StatsSummaryTileValue>

        <StatsSummaryTileTitle>{tileTitle}</StatsSummaryTileTitle>

        <StatsSummaryTileSubtitle>
          <StatsSummaryTileActivityDot $color={tileValueColor}>
            .
          </StatsSummaryTileActivityDot>

          {tileSubtitle.highlighted && (
            <StatsSummaryTileSubtitlePrice>
              {tileSubtitle.highlighted}
            </StatsSummaryTileSubtitlePrice>
          )}

          {tileSubtitle.content}

          <Popper
            anchorEl={anchorEl}
            open={open}
            placement="bottom-start"
            disablePortal
            sx={{ zIndex: 1300 }}
          >
            <Paper style={styles.paperStyle}>
              <Typography sx={styles.contentStyle}>
                {infoDescription}
              </Typography>
            </Paper>
          </Popper>

          <span
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
            style={styles.infoIconContainer}
          >
            <InfoOutlineIcon style={styles.infoIconStyle} />
          </span>
        </StatsSummaryTileSubtitle>

        {tileIcon}
      </GlassTile>
    </StatsSummaryTile>
  );
};

export default StatsSummaryTileItem;
