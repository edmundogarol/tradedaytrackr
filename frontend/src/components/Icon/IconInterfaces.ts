import type GlyphIonIcons from "./libraries/GlyphIonicon";
import type GlyphFontAwesome from "./libraries/GlyphFontAwesome";
import type GlyphFontAwesome5 from "./libraries/GlyphFontAwesome5";
import type GlyphMaterialIcons from "./libraries/GlyphMaterialIcons";
import type GlyphMaterialCommunityIcons from "./libraries/GlyphMaterialCommunityIcons";
import type { CustomSvgIconName } from "./libraries/CustomSvgIcon";

export type IconGlyph =
  | GlyphFontAwesome
  | GlyphFontAwesome5
  | GlyphIonIcons
  | GlyphMaterialIcons
  | GlyphMaterialCommunityIcons
  | CustomSvgIconName;

export enum IconTypeEnum {
  FontAwesome = "FontAwesome",
  FontAwesome5 = "FontAwesome5",
  Ionicons = "Ionicons",
  MaterialIcons = "MaterialIcons",
  MaterialCommunityIcons = "MaterialCommunityIcons",
  CustomSvgIcon = "CustomSvgIconName",
}

export interface IconProps {
  name: IconGlyph;
  size?: number;
  style?: React.CSSProperties | React.CSSProperties[];
  type?: IconTypeEnum;
  color?: string;
  onPress?: () => void;
  iconProps?: IconProps;
}
