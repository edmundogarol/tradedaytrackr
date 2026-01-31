import GlassTile from "@components/GlassTile/GlassTile";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import {
  TileContainer,
  ActivityDot,
  Subtitle,
  SubtitlePrice,
  Title,
  MainValue,
} from "./StatsSummaryStyledComponents";
import type { StatsSummaryTileDetails } from "./StatsSummary";

const StatsSummaryTileItem: React.FC<StatsSummaryTileDetails> = ({
  tileValue,
  tileValueColor,
  tileTitle,
  tileSubtitle,
  infoDescription,
  tileShinePositive,
  tileIcon,
}) => {
  return (
    <TileContainer>
      <GlassTile positive={tileShinePositive}>
        <MainValue $color={tileValueColor}>{tileValue}</MainValue>
        <Title>{tileTitle}</Title>
        <Subtitle>
          <ActivityDot $color={tileValueColor}>.</ActivityDot>
          {tileSubtitle.highlighted && (
            <SubtitlePrice $color={tileValueColor}>
              {tileSubtitle.highlighted}
            </SubtitlePrice>
          )}
          {tileSubtitle.content}
          <InfoPopout infoDescription={infoDescription!} />
        </Subtitle>
        {tileIcon}
      </GlassTile>
    </TileContainer>
  );
};

export default StatsSummaryTileItem;
