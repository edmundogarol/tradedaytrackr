import { color } from "@styles/colors";
import styled, { css } from "styled-components";

export const Container = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 20px;
  justify-self: center;
  background-color: white;
`;

export const ListContainer = styled.div`
  background: white;
  text-align: start;
  color: black;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100px;
  margin-top: -10px;
  gap: 3px;
  padding: 5px;
  border-radius: 3px;
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
`;

export const CloseIconContainer = styled.div`
  color: grey;
  position: absolute;
  right: 0;
  top: 0;
  padding: 8px;
  opacity: 0.8;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
