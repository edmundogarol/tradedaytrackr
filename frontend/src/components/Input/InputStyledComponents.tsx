import styled, { css } from "styled-components";
import {
  CONTAINER_BORDER_RADIUS_SMALL,
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_SMALL,
  INPUT_SIZE,
  LABEL_SIZE,
  LABEL_SIZE_MEDIUM,
  TEXT_SIZE,
} from "@styles/constants";
import { color } from "@styles/colors";
import { Label } from "@styles/globalStyledComponents";

export const Container = styled.div`
  width: 100%;
`;

export const InputContainer = styled.div<{
  $error?: boolean;
}>`
  background-color: ${color("SystemBackground1")};
  display: flex;
  align-items: center;
  height: ${INPUT_SIZE}px;
  border-bottom-width: 0.5px;
  border-color: ${color("SystemBorder")};
  flex-direction: row;
  border-radius: ${CONTAINER_BORDER_RADIUS_SMALL}px;
  ${({ $error }): any => {
    if ($error) {
      return css`
        border-color: ${color("SystemError2")};
        border-width: 1px;
      `;
    }
  }}
`;

export const IconContainer = styled.div`
  margin-left: ${CONTAINER_MARGIN_DEFAULT}px;
  margin-right: ${CONTAINER_MARGIN_SMALL}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputStyled = styled.input<{
  $disabled?: boolean;
  $placeholderTextColor?: string;
}>`
  flex: 1;
  height: 90%;
  font-size: ${TEXT_SIZE}px;
  padding-left: ${CONTAINER_PADDING_SMALL}px;
  padding-right: ${CONTAINER_PADDING_SMALL}px;
  border: none;
  background-color: ${color("SystemBackground1")};
  ${({ $placeholderTextColor }): any => {
    if ($placeholderTextColor)
      return css`
        &::placeholder {
          color: ${$placeholderTextColor};
        }
      `;
  }}
  ${({ $disabled }): any => {
    if ($disabled)
      return css`
        color: ${color("SystemLabel1")};
      `;
  }}
`;

export const InputLabel = styled(Label)<{
  $error?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  color: ${({ $error, $disabled }): string =>
    $error
      ? color("SystemError2")
      : $disabled
        ? color("SystemLabel3")
        : color("SystemLabel1")};
  margin-bottom: 10px;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  font-weight: 100;
`;

export const Subtext = styled.span`
  color: ${color("SystemLabel3")};
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
`;

export const Error = styled.span`
  color: ${color("SystemError2")};
  font-size: ${LABEL_SIZE}px;
  margin-left: ${CONTAINER_MARGIN_SMALL}px;
  width: 90%;
`;

export const ErrorContainer = styled.div`
  flex-direction: row;
  margin-top: ${CONTAINER_MARGIN_DEFAULT}px;
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
  width: auto;
  display: flex;
  align-items: center;
`;
