import { color } from "@styles/colors";
import { CONTAINER_MARGIN_LARGE } from "@styles/constants";
import styled from "styled-components";

export const Container = styled.div<{ $transparent?: boolean }>`
  height: min-content;
  width: 100%;
  ${({ $transparent }): string =>
    $transparent
      ? `background-color: transparent;`
      : `background-color: ${color("SystemBackground1")};`}
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HomeLogo = styled.img`
  height: 50px;
  margin-left: ${CONTAINER_MARGIN_LARGE}px;
  margin-top: ${CONTAINER_MARGIN_LARGE}px;
`;

export const TopBarMenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${CONTAINER_MARGIN_LARGE}px;
  padding-top: ${CONTAINER_MARGIN_LARGE}px;
`;

export const TopBarMenuItem = styled.div`
  margin-left: 20px;
  cursor: pointer;
  font-weight: 500;
`;

export const TopBarMenuItemText = styled.span`
  color: ${color("SystemLabel1")};
  font-size: 14px;
`;
