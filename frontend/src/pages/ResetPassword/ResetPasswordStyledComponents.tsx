import styled from "styled-components";
import {
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
} from "@styles/constants";
import { color } from "@styles/colors";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
  margin-top: auto;
  margin-bottom: auto;
`;

export const InputsContainer = styled.div`
  width: 100%;
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const Header = styled.div`
  color: ${color("SystemLabel1")};
  font-size: 20px;
  font-weight: 100;
`;
