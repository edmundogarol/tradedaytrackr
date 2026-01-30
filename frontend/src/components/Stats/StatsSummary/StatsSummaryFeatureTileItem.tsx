import GlassTile from "@components/GlassTile/GlassTile";
import {
  StatsSummaryFeatureTileTitle,
  StatsSummaryTile,
  StatsSummaryTileSubtitle,
  StatsSummaryTileSubtitlePrice,
  StatsSummaryTileValue,
} from "./StatsSummaryStyledComponents";
import type { StatsSummaryTileDetails } from "./StatsSummary";

const StatsSummaryFeatureTileItem: React.FC<StatsSummaryTileDetails> = ({
  tileValue,
  tileValueColor,
  tileTitle,
  tileSubtitle,
  tileShinePositive,
  tileIcon,
}) => {
  return (
    <StatsSummaryTile>
      <GlassTile positive={tileShinePositive} leftAlign>
        <StatsSummaryFeatureTileTitle>{tileTitle}</StatsSummaryFeatureTileTitle>

        <StatsSummaryTileValue $color={tileValueColor}>
          {tileIcon}
          {tileValue}
        </StatsSummaryTileValue>
        <StatsSummaryTileSubtitle>
          {tileSubtitle.highlighted && (
            <StatsSummaryTileSubtitlePrice $color={tileValueColor}>
              {tileSubtitle.highlighted}
            </StatsSummaryTileSubtitlePrice>
          )}

          {tileSubtitle.content}
        </StatsSummaryTileSubtitle>
      </GlassTile>
    </StatsSummaryTile>
  );
};

export default StatsSummaryFeatureTileItem;
