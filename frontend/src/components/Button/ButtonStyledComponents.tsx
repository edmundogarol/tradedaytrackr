import { color } from "@styles/colors";
import {
  BUTTON_SIZE,
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_SMALL,
} from "@styles/constants";
import styled from "styled-components";
import { ButtonType } from "./ButtonInterfaces";

export const PressableWrapper = styled.button<{
  loading?: boolean;
  transparent?: boolean;
  disabledBlock?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ loading, transparent, disabledBlock }) => {
    if (loading) {
      return "#c1d5e7";
    }
    if (disabledBlock) {
      return color("SystemLabel1");
    }
    if (transparent) {
      return "transparent";
    }
    return color("SystemBlue3");
  }};
  padding: ${CONTAINER_PADDING_DEFAULT}px;
  width: 100%;
  height: ${BUTTON_SIZE}px;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.span<{ buttonType?: ButtonType }>`
  font-size: 17px;
  color: ${({ buttonType }) => {
    switch (buttonType) {
      case ButtonType.Block:
        return "white";
      case ButtonType.Outline:
      case ButtonType.HuggingOutline:
        return color("SystemBlue3");
    }
  }};
`;

export const OutlinedPressableWrapper = styled.button<{
  loading?: boolean;
  transparent?: boolean;
  disabledBlock?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ loading, disabledBlock }) => {
    if (loading) {
      return "#c1d5e7";
    }
    if (disabledBlock) {
      return color("SystemLabel1");
    }
    return "transparent";
  }};
  padding: ${CONTAINER_PADDING_DEFAULT}px;
  width: 100%;
  height: ${BUTTON_SIZE}px;
  border-radius: 5px;
  align-items: center;
  border-width: 1px;
  border-color: ${color("SystemBlue3")};
`;

export const HuggingOutlinedPressableWrapper = styled.button<{
  loading?: boolean;
  transparent?: boolean;
  disabledBlock?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ loading, disabledBlock }) => {
    if (loading) {
      return "#c1d5e7";
    }
    if (disabledBlock) {
      return color("SystemLabel1");
    }
    return "transparent";
  }};
  padding: ${CONTAINER_PADDING_SMALL}px;
  padding-left: ${CONTAINER_PADDING_DEFAULT}px;
  padding-right: ${CONTAINER_PADDING_DEFAULT}px;
  border-radius: 10px;
  align-items: center;
  border-width: 1px;
  border-color: ${color("SystemBlue3")};
`;
