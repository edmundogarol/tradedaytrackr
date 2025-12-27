import React from "react";
import type GlyphsMaterialIcons from "./GlyphMaterialIcons";

export type MaterialIconName = GlyphsMaterialIcons;

interface Props {
  name: MaterialIconName;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties | React.CSSProperties[];
}

export const MaterialIcon: React.FC<Props> = ({
  name,
  size = 24,
  color = "inherit",
  className,
  style,
}) => {
  return (
    <span
      className={`material-icons ${className ?? ""}`}
      style={{
        fontSize: size,
        color,
        ...(Array.isArray(style) ? Object.assign({}, ...style) : style),
      }}
      aria-hidden
    >
      {name}
    </span>
  );
};
