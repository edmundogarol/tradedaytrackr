import React from "react";
import type { IconProps } from "./IconInterfaces";
import { IconTypeEnum } from "./IconInterfaces";
import type GlyphMaterialIcons from "./libraries/GlyphMaterialIcons";
import type { CustomSvgIconName } from "./libraries/CustomSvgIcon";
import CustomSvgIcon from "./libraries/CustomSvgIcon";
import { MaterialIcon } from "./libraries/MaterialIcon";

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  size = 18,
  type,
  style = {},
  color,
}) => {
  switch (type) {
    case IconTypeEnum.MaterialIcons:
      return (
        <MaterialIcon
          color={color}
          size={size}
          style={style}
          name={name as GlyphMaterialIcons}
        />
      );
    case IconTypeEnum.CustomSvgIcon:
      return (
        <CustomSvgIcon
          color={color}
          size={size}
          style={style}
          name={name as CustomSvgIconName}
        />
      );
    default:
      return (
        <MaterialIcon
          color={color}
          size={size}
          style={style}
          name={name as GlyphMaterialIcons}
        />
      );
  }
};

export default Icon;
