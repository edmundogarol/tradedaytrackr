import React from "react";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {
  StatsSummaryContainer,
  StatsSummaryTile,
  StatsSummaryTileTitle,
  StatsSummaryTileValue,
  StatsSummaryTileValueDaysToPayout,
  StatsSummaryTileValuePnL,
  StatsSummaryTileValueWinRate,
} from "./StatsSummaryStyledComponents";

interface StatsSummaryProps {}

const StatsSummary: React.FunctionComponent<StatsSummaryProps> = ({}) => {
  const iconStyle = (size: number): React.CSSProperties => ({
    height: size,
    width: size,
    color: "#4857736e",
    position: "absolute",
    zIndex: 0,
  });

  return (
    <StatsSummaryContainer>
      <StatsSummaryTile>
        <StatsSummaryTileValuePnL>$523</StatsSummaryTileValuePnL>
        <StatsSummaryTileTitle>Withdrawable PnL</StatsSummaryTileTitle>
        <PriceCheckIcon style={iconStyle(100)} />
      </StatsSummaryTile>
      <StatsSummaryTile>
        <StatsSummaryTileValueDaysToPayout>5</StatsSummaryTileValueDaysToPayout>
        <StatsSummaryTileTitle>Days to Payout</StatsSummaryTileTitle>
        <DateRangeIcon style={iconStyle(80)} />
      </StatsSummaryTile>
      <StatsSummaryTile>
        <StatsSummaryTileValue>10</StatsSummaryTileValue>
        <StatsSummaryTileTitle>Active PAs</StatsSummaryTileTitle>
        <AutoAwesomeMotionIcon style={iconStyle(80)} />
      </StatsSummaryTile>
      <StatsSummaryTile>
        <StatsSummaryTileValueWinRate>75%</StatsSummaryTileValueWinRate>
        <StatsSummaryTileTitle>Win Rate</StatsSummaryTileTitle>
        <CheckCircleOutlineIcon style={iconStyle(80)} />
      </StatsSummaryTile>
    </StatsSummaryContainer>
  );
};

export default StatsSummary;
