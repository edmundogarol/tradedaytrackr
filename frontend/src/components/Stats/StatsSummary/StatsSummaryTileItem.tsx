import GlassTile from "@components/GlassTile/GlassTile";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import { ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
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
  onTileClick,
  tileDropdownItems,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const hasMultipleDropdownItems = (tileDropdownItems?.length ?? 0) > 1;
  const isClickable = !!onTileClick || !!tileDropdownItems?.length;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (hasMultipleDropdownItems) {
      setAnchorEl(event.currentTarget);
      return;
    }
    if (tileDropdownItems?.length === 1) {
      tileDropdownItems[0].onClick();
      return;
    }
    onTileClick?.();
  };

  return (
    <TileContainer
      onClick={isClickable ? handleClick : undefined}
      style={isClickable ? { cursor: "pointer" } : undefined}
    >
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
      {hasMultipleDropdownItems && (
        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          onClick={(e) => e.stopPropagation()}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}
        >
          {tileDropdownItems?.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => {
                setAnchorEl(null);
                item.onClick();
              }}
            >
              <ListItemText primary={item.label} secondary={item.subLabel} />
            </MenuItem>
          ))}
        </Menu>
      )}
    </TileContainer>
  );
};

export default StatsSummaryTileItem;
