import GlassTile from "@components/GlassTile/GlassTile";
import {
  Title,
  TileContainer,
  Subtitle,
  SubtitlePrice,
  MainValue,
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
    <TileContainer>
      <GlassTile positive={tileShinePositive} leftAlign>
        <Title>{tileTitle}</Title>
        <MainValue $color={tileValueColor}>
          {tileIcon}
          {tileValue}
        </MainValue>
        <Subtitle>
          {tileSubtitle.highlighted && (
            <SubtitlePrice $color={tileValueColor}>
              {tileSubtitle.highlighted}
            </SubtitlePrice>
          )}
          {tileSubtitle.content}
        </Subtitle>
      </GlassTile>
    </TileContainer>
  );
};

export default StatsSummaryFeatureTileItem;
