import styled from "styled-components";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
} from "@styles/constants";
import { color } from "@styles/colors";
import Button from "@components/Button/Button";
import { Link } from "react-router";

export const LoginContainer = styled.div`
  align-items: center;
  justify-content: center;
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
  max-width: 420px;
  width: 100%;
`;

export const LoginInputsContainer = styled.div`
  width: 100%;
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const LoginHeader = styled.h1`
  width: 250px;
  font-size: 30px;
  font-weight: 100;
  text-align: center;
`;

export const SignUpTextContainer = styled.div`
  flex-direction: row;
  margin-top: ${CONTAINER_MARGIN_DEFAULT}px;
`;
export const SignUpText = styled.p``;

export const SignUpLink = styled(Link)`
  color: ${color("SystemBlue1")};
  margin-left: ${CONTAINER_MARGIN_SMALL}px;
  font-weight: 800;
`;

export const ForgotPasswordLink = styled(Link)`
  margin-left: auto;
`;

export const LoginButton = styled(Button)``;
