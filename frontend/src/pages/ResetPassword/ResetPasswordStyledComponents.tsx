import styled from "styled-components";
import {
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
} from "@styles/constants";

export const ResetPasswordContainer = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
`;

export const ResetPasswordInputsContainer = styled.div`
  width: 100%;
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const ResetPasswordHeader = styled.div`
  font-size: 30px;
  font-weight: 100;
`;
