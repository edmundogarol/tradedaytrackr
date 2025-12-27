import React from "react";
import { color as colorLibrary } from "@styles/colors";

export type CustomSvgIconName = "CustomSVGIcon";

interface CustomSvgIconProps {
  name: CustomSvgIconName;
  color?: string;
  width?: number;
  height?: number;
  size?: number;
  style?: React.CSSProperties | React.CSSProperties[];
}

const CustomSvgIcon: React.FunctionComponent<CustomSvgIconProps> = ({
  name,
  width,
  height,
  color = colorLibrary("SystemWhite"),
  size,
  style,
}) => {
  const w = size ? size : width || 48;
  const h = size ? size : height || 48;

  switch (name) {
    case "CustomSVGIcon":
      return (
        <span
          style={{
            display: "inline-block",
            width: w,
            height: h,
            color: color,
            ...(Array.isArray(style) ? Object.assign({}, ...style) : style),
          }}
        >
          <span />
        </span>
      );
    default:
      console.error("Invalid iconName", name);
      return null;
  }
};

export default CustomSvgIcon;
