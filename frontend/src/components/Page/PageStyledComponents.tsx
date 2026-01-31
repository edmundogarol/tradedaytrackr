import { color } from "@styles/colors";
import { CONTAINER_PADDING_LARGE } from "@styles/constants";
import styled from "styled-components";

export const Container = styled.div<{ $withSideDrawer?: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(
    0deg,
    ${color("SystemBackground")} 35%,
    rgba(48, 66, 97, 1) 100%
  );

  ${({ $withSideDrawer }): string =>
    $withSideDrawer
      ? ` padding-left: calc(64px + 1px);
    `
      : ""}
`;

export const ChildrenContainer = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;

  margin-left: auto;
  margin-right: auto;

  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;

  align-items: center;
`;
