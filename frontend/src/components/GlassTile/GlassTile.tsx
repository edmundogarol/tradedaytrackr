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
}

const GlassTile: React.FunctionComponent<GlassTileProps> = ({
  overlay,
  positive = false,
  children,
}) => {
  return (
    <GlassTileContainer>
      {overlay}
      <GlassTileEffect />
      <GlassTileShine />
      <GlassTileBoxGlow $positive={positive} />
      {children}
    </GlassTileContainer>
  );
};

export default GlassTile;
