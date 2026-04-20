import { color } from "@styles/colors";
import {
  CONTAINER_BORDER_RADIUS_SMALL,
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_SMALL,
  INPUT_SIZE,
  LABEL_SIZE,
  TEXT_SIZE,
} from "@styles/constants";
import { Label } from "@styles/globalStyledComponents";
import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const InputContainer = styled.div<{
  $darkMode?: boolean;
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
  width: 100%;

  ${({ $darkMode }): any => {
    if ($darkMode)
      return css`
        background: unset;
      `;
  }}
`;
export const MaxChar = styled.div`
  color: #b9b9b9;
  font-size: 11px;
  margin-left: 10px;
  align-items: center;
  display: flex;
  margin-right: 5px;
`;

export const CurrentCharCount = styled.span<{
  $exceeded?: boolean;
}>`
  color: ${({ $exceeded }): string =>
    $exceeded ? color("SystemError2") : "#b9b9b9"};
  font-size: 11px;
`;

export const IconContainer = styled.div`
  margin-left: ${CONTAINER_MARGIN_DEFAULT}px;
  margin-right: ${CONTAINER_MARGIN_SMALL}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputStyled = styled.input<{
  $darkMode?: boolean;
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
  ${({ $darkMode }): any => {
    if ($darkMode)
      return css`
        background: #353f53;
        color: #bdbdbd;
        border: none;
        padding-left: 10px;
        border-radius: 4px;
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

export const ListContainer = styled.div`
  background: white;
  text-align: start;
  color: black;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 120px;
  gap: 3px;
  padding: 5px;
  border-radius: 3px;
  z-index: 21;
  max-height: 200px;
  overflow-y: auto;
  font-size: 14px;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(200, 200, 200, 0.5);
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const ListItem = styled.div<{
  $disabled?: boolean;
  $selected?: boolean;
}>`
  padding: 5px;
  border-radius: 3px;
  ${({ $disabled, $selected }): any =>
    $disabled
      ? css`
          font-size: 12px;
          color: ${color("SystemLabel3")};
        `
      : $selected
        ? css`
            background-color: #3e52722e;
          `
        : css`
            &:hover {
              cursor: pointer;
              background-color: #3e52722e;
            }
          `}
  text-transform: capitalize;
`;
