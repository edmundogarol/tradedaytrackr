import React from "react";

import { StatsSummaryContainer } from "./StatsSummaryStyledComponents";
import useGetStatsSummaryTilesDetails from "./hooks/useGetStatsSummaryTilesDetails";
import StatsSummaryTileItem from "./StatsSummaryTileItem";

interface StatsSummaryProps {}

const StatsSummary: React.FunctionComponent<StatsSummaryProps> = ({}) => {
  const statsSummaryTilesDetails = useGetStatsSummaryTilesDetails();

  return (
    <StatsSummaryContainer>
      {statsSummaryTilesDetails.map((tileDetails) => (
        <StatsSummaryTileItem key={tileDetails.tileTitle} {...tileDetails} />
      ))}
    </StatsSummaryContainer>
  );
};

export default StatsSummary;
