import { color } from "@styles/colors";
import { CONTAINER_MARGIN_LARGE } from "@styles/constants";
import styled from "styled-components";

export const TopBarContainer = styled.div<{ $transparent?: boolean }>`
  height: min-content;
  width: 100%;
  ${({ $transparent }) =>
    $transparent
      ? `background-color: transparent;`
      : `background-color: ${color("SystemBackground1")};`}
`;

export const TopBarHomeLogo = styled.img`
  height: 50px;
  margin-left: ${CONTAINER_MARGIN_LARGE}px;
  margin-top: ${CONTAINER_MARGIN_LARGE}px;
`;
