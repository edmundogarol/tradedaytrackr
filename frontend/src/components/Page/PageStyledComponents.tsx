import { color } from "@styles/colors";
import { CONTAINER_PADDING_LARGE } from "@styles/constants";
import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  background-color: red;
  overflow: hidden;
  background: linear-gradient(
    0deg,
    ${color("SystemBackground")} 35%,
    rgba(48, 66, 97, 1) 100%
  );
`;

export const ChildrenContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
`;
