import React from "react";
import { If } from "@components/If/If";
import {
  BoxGlow,
  Container,
  GlassEffect,
  Shine,
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
  noGlassEffect?: boolean;
  containerStyle?: React.CSSProperties;
}

const GlassTile: React.FunctionComponent<GlassTileProps> = ({
  overlay,
  positive,
  children,
  featureTile = false,
  leftAlign = false,
  minHeight,
  minWidth,
  padding,
  noGlow = false,
  noShine = false,
  noGlassEffect = false,
  containerStyle,
}) => {
  return (
    <Container
      $leftAlign={leftAlign}
      $minHeight={minHeight}
      $minWidth={minWidth}
      $padding={padding}
      style={containerStyle}
    >
      {overlay}
      <If condition={!noGlassEffect}>
        <GlassEffect />
      </If>
      <If condition={!noShine}>
        <Shine />
      </If>
      <If condition={!noGlow}>
        <BoxGlow $positive={positive} $featureTile={featureTile} />
      </If>
      {children}
    </Container>
  );
};

export default GlassTile;
