import { color } from "@styles/colors";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  LABEL_SIZE,
} from "@styles/constants";
import styled from "styled-components/native";

export const FormSuccessDetail = styled.Text`
  color: ${color("SystemSuccess2")};
  font-size: ${LABEL_SIZE}px;
  margin-left: ${CONTAINER_MARGIN_SMALL}px;
  margin-bottom: ${CONTAINER_MARGIN_SMALL}px;
  width: 90%;
`;

export const FormSuccessContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
  width: auto;
`;
