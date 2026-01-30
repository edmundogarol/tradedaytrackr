import React from "react";
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
}

const GlassTile: React.FunctionComponent<GlassTileProps> = ({
  overlay,
  positive = false,
  children,
  featureTile = false,
  leftAlign = false,
}) => {
  return (
    <GlassTileContainer $leftAlign={leftAlign}>
      {overlay}
      <GlassTileEffect />
      <GlassTileShine />
      <GlassTileBoxGlow $positive={positive} $featureTile={featureTile} />
      {children}
    </GlassTileContainer>
  );
};

export default GlassTile;
