import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_PADDING_DEFAULT,
} from "@styles/constants";
import { Section } from "@styles/globalStyledComponents";
import styled from "styled-components";

export const EntryDetails = styled(Section)`
  flex: 4;
`;

export const EntryInfoContainer = styled.div`
  display: flex;
`;

export const TradeInfo = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 5px;
`;

export const TradeCapture = styled.div`
  border-top: 1px solid #ffffff1f;
  border-bottom: 1px solid #ffffff1f;
  margin-left: ${CONTAINER_MARGIN_DEFAULT}px;
`;

export const TradeImage = styled.div<{ $src: string }>`
  width: 250px;
  height: 150px;
  background-image: url(${(props): string => props.$src});
  background-size: cover;
  background-position: center;
`;

export const TradeSubtitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #a3a3a3;
  font-weight: 200;
  z-index: 11;
  align-self: flex-start;
  font-size: 14px;
  padding-left: ${CONTAINER_PADDING_DEFAULT}px;
  padding-right: ${CONTAINER_PADDING_DEFAULT}px;
  border-right: 1px solid #9c9c9c6f;
`;

export const TagContainer = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;
export const Tag = styled.div`
  background: #c4ffc41c;
  color: #b8f3b8;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 5px;
  padding-left: 7px;
  padding-right: 7px;
  text-transform: capitalize;
`;

export const EditDeleteButtons = styled.div`
  color: #c9c9c9;
  margin-left: auto;
  display: flex;
`;

export const ButtonContainer = styled.div`
  opacity: 0.7;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export const Information = styled(Section)`
  flex: 1;
`;
