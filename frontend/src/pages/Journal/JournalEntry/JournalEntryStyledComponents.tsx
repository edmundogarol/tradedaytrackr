import { color } from "@styles/colors";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
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
  margin-left: ${CONTAINER_MARGIN_DEFAULT}px;
  display: flex;
`;

export const TradeSingleAccountInfo = styled.div`
  flex: 1;
  margin-left: ${CONTAINER_MARGIN_DEFAULT}px;
  margin-top: ${CONTAINER_MARGIN_DEFAULT}px;
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
  color: ${color("SystemLightGreen")};
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

export const Summary = styled(Section)`
  flex: 1;
`;

export const SummarySection = styled(Section)``;

export const SummaryItem = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #7881902e;
  padding-bottom: 7px;
`;

export const SummaryItemTitle = styled.span`
  color: #888888;
  font-size: 14px;
`;
export const SummaryItemValue = styled.span`
  color: ${color("SystemLightGreen")};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
export const SummaryItemValueSubtext = styled.span`
  color: #888888;
  font-size: 14px;
`;

export const SummaryItemPnL = styled.span`
  color: ${color("SystemLightGreen")};
  font-size: 20px;
`;

export const DescriptionSection = styled(Section)`
  padding-left: ${CONTAINER_MARGIN_SMALL}px;
  padding-right: 20px;
`;

export const DescriptionText = styled.p`
  color: #888888;
  font-size: 14px;
`;

export const SummaryTitleInfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;
