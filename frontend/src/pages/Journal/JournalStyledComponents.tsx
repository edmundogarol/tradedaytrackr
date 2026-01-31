import styled from "styled-components";
import { CONTAINER_PADDING_LARGE } from "@styles/constants";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
`;
