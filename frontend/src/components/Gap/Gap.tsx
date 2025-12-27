import React from "react";
import { CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import { GapContainer } from "./GapStyledComponents";

export interface GapProps {
  isVertical?: boolean;
  baseValue?: number;
  level?: number;
}

const Gap: React.FunctionComponent<GapProps> = ({
  isVertical = true,
  baseValue = CONTAINER_PADDING_DEFAULT,
  level = 1,
}) => {
  return (
    <GapContainer
      $isVertical={isVertical}
      $baseValue={baseValue}
      $level={level}
    />
  );
};

export default Gap;
