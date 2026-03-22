import { color } from "@styles/colors";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  LABEL_SIZE,
} from "@styles/constants";
import styled from "styled-components";

export const FormSuccessDetail = styled.div`
  color: ${color("SystemSuccess2")};
  font-size: ${LABEL_SIZE}px;
  margin-left: ${CONTAINER_MARGIN_SMALL}px;
  margin-bottom: ${CONTAINER_MARGIN_SMALL}px;
  width: 90%;
`;

export const FormSuccessContainer = styled.div`
  flex-direction: row;
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
  width: auto;
  display: flex;
`;
