import React from "react";

import { Else, If } from "@components/If/If";
import { Container } from "./StatsSummaryStyledComponents";
import StatsSummaryTileItem from "./StatsSummaryTileItem";
import StatsSummaryFeatureTileItem from "./StatsSummaryFeatureTileItem";

export interface StatsSummaryTileDetails {
  tileValue: string;
  tileValueColor: string;
  tileTitle: string;
  tileSubtitle: {
    highlighted?: string;
    content: string;
  };
  tileShinePositive?: boolean;
  infoDescription?: string;
  tileIcon?: React.ReactNode;
}

interface StatsSummaryProps {
  statsSummaryTilesDetails: StatsSummaryTileDetails[];
  featureTiles?: boolean;
}

const StatsSummary: React.FunctionComponent<StatsSummaryProps> = ({
  statsSummaryTilesDetails,
  featureTiles,
}) => {
  return (
    <Container>
      <If condition={!featureTiles}>
        {statsSummaryTilesDetails.map((tileDetails) => (
          <StatsSummaryTileItem key={tileDetails.tileTitle} {...tileDetails} />
        ))}
        <Else>
          {statsSummaryTilesDetails.map((tileDetails) => (
            <StatsSummaryFeatureTileItem
              key={tileDetails.tileTitle}
              {...tileDetails}
            />
          ))}
        </Else>
      </If>
    </Container>
  );
};

export default StatsSummary;
