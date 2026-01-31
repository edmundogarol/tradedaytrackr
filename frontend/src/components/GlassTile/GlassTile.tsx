import React from "react";
import { If } from "@components/If/If";
import {
  GlassTileBoxGlow,
  GlassTileContainer,
  GlassTileEffect,
  GlassTileShine,
} from "./GlassTileStyledComponents";

interface GlassTileProps {
  overlay?: React.ReactNode;
  positive?: boolean;
  children?: React.ReactNode;
  featureTile?: boolean;
  leftAlign?: boolean;
  minHeight?: number;
  minWidth?: number;
  padding?: number;
  noGlow?: boolean;
  noShine?: boolean;
}

const GlassTile: React.FunctionComponent<GlassTileProps> = ({
  overlay,
  positive = false,
  children,
  featureTile = false,
  leftAlign = false,
  minHeight,
  minWidth,
  padding,
  noGlow = false,
  noShine = false,
}) => {
  return (
    <GlassTileContainer
      $leftAlign={leftAlign}
      $minHeight={minHeight}
      $minWidth={minWidth}
      $padding={padding}
    >
      {overlay}
      <GlassTileEffect />
      <If condition={!noShine}>
        <GlassTileShine />
      </If>
      <If condition={!noGlow}>
        <GlassTileBoxGlow $positive={positive} $featureTile={featureTile} />
      </If>
      {children}
    </GlassTileContainer>
  );
};

export default GlassTile;
