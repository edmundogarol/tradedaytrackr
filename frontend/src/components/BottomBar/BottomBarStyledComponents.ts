import { color } from "@styles/colors";
import { CONTAINER_PADDING_LARGE } from "@styles/constants";
import { Link } from "react-router";
import styled from "styled-components";

export const BottomBarContainer = styled.div<{ $transparent?: boolean }>`
  padding: ${CONTAINER_PADDING_LARGE}px;
  text-align: end;
  ${({ $transparent }) =>
    $transparent
      ? `background-color: transparent;`
      : `background-color: ${color("SystemBackground1")};`}
`;

export const BottomBarLink = styled(Link)`
  margin: 10px;
  font-size: 12px;
  color: ${color("SystemLabel1")};
`;
