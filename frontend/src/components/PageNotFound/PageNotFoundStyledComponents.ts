import { color } from "@styles/colors";
import { CONTAINER_MARGIN_LARGE } from "@styles/constants";
import styled from "styled-components";

export const Container = styled.div<{ $transparent?: boolean }>`
  height: min-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const Logo = styled.img`
  height: 100px;
  margin-left: ${CONTAINER_MARGIN_LARGE}px;
  margin-top: ${CONTAINER_MARGIN_LARGE}px;
`;

export const Text = styled.h1`
  color: ${color("SystemLabel1")};
  margin-top: 20px;
`;

export const SubText = styled.p`
  color: ${color("SystemLabel1")};
  font-size: 15px;
`;
