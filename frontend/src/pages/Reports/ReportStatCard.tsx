import InfoPopout from "@components/InfoPopout/InfoPopout";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box } from "@mui/material";
import { color } from "@styles/colors";
import React from "react";
import ReportChart from "./ReportChart";
import {
  ReportStatCardContainer,
  ReportTileTitle,
  SubValue,
  Value,
  ValueRow,
} from "./ReportsStyledComponents";

interface StatCardProps {
  title: string;
  value: string | React.ReactNode;
  subValue?: string;
  positive?: boolean;
  showChart?: boolean;
  description?: string;
}

const StatCard = ({
  title,
  value,
  subValue,
  positive,
  showChart,
  description,
}: StatCardProps): React.ReactElement => {
  return (
    <ReportStatCardContainer>
      <ReportTileTitle>
        {title}
        <InfoPopout infoDescription={description || "Trade performance stat"} />
      </ReportTileTitle>

      <ValueRow>
        <Value $positive={positive}>{value}</Value>
        {positive !== undefined && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: positive ? color("SystemLightGreen") : color("SystemRed"),
            }}
          >
            {positive ? (
              <ArrowUpward fontSize="small" />
            ) : (
              <ArrowDownward fontSize="small" />
            )}
          </Box>
        )}
      </ValueRow>

      {subValue && <SubValue>{subValue}</SubValue>}

      {showChart && <ReportChart />}
    </ReportStatCardContainer>
  );
};

export default StatCard;
