import {
  closedDrawerWidth,
  drawerWidth,
} from "@components/SideDrawer/SideDrawerWrapper";
import { color } from "@styles/colors";
import { CONTAINER_PADDING_LARGE } from "@styles/constants";
import styled from "styled-components";

export const Container = styled.div<{
  $drawerOpen?: boolean;
  $withSideDrawer?: boolean;
  $backgroundColor?: {
    $light: string;
    $dark: string;
  };
}>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(
    0deg,
    ${(props): string =>
        props?.$backgroundColor?.$dark
          ? props?.$backgroundColor?.$dark
          : color("SystemBackground")}
      35%,
    ${(props): string =>
        props?.$backgroundColor?.$light
          ? props?.$backgroundColor?.$light
          : color("SystemBackground3")}
      100%
  );

  transition: padding-left 0.25s ease;

  padding-left: ${({ $withSideDrawer, $drawerOpen }): string =>
    $withSideDrawer
      ? `${($drawerOpen ? drawerWidth : closedDrawerWidth) + 1}px`
      : `0px`};
`;

export const ChildrenContainer = styled.div`
  flex: 1;
  width: 100%;
  /* max-width: 1200px; */ // Make mobile responsive by removing max width

  display: flex;
  flex-direction: column;

  margin-left: auto;
  margin-right: auto;

  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;

  align-items: center;
`;
