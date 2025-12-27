import styled from "styled-components";
import {
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
} from "@styles/constants";
import Button from "@components/Button/Button";

export const SignUpContainer = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const SignUpScrollView = styled.div`
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
  width: 100%;
`;

export const SignUpInputsContainer = styled.div`
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const SignUpHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SignUpHeader = styled.h1`
  font-size: 30px;
  font-weight: 100;
`;

export const SignUpButton = styled(Button)``;
