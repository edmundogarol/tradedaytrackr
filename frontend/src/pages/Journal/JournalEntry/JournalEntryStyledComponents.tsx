import CloseIcon from "@mui/icons-material/Close";
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
  z-index: 11;
  min-width: 500px;
`;

export const EntryInfoContainer = styled.div`
  display: flex;
`;

export const TradeInfo = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
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
  position: relative;
`;

export const TradeSubtitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #a3a3a3;
  font-weight: 200;
  z-index: 11;
  font-size: 14px;
  padding-left: ${CONTAINER_PADDING_DEFAULT}px;
  padding-right: ${CONTAINER_PADDING_DEFAULT}px;
  border-right: 1px solid #9c9c9c6f;
  align-items: center;
`;

export const SaveButton = styled(TradeSubtitle)`
  background: #d0d8e687;
  color: black;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
`;

export const TradeSubtitleEditing = styled(TradeSubtitle)<{
  $disabled?: boolean;
}>`
  background: white;
  color: black;
  border-radius: 3px;
  margin-right: 5px;
  ${({ $disabled }): any =>
    $disabled
      ? `
    background: #d0d8e687;
    &:hover {
    pointer-events: auto;
      cursor: not-allowed;
    }
  `
      : `
    &:hover {
      cursor: pointer;
      background: #efefef;
    }
  `}
`;

export const TagContainer = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 5px;
  display: flex;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  min-width: 200px;
`;

export const TagInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 350px;
  width: 100%;
  margin-right: 10px;
`;

export const Tag = styled.div<{ $editing?: boolean }>`
  background: #c4ffc41c;
  color: ${color("SystemLightGreen")};
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 5px;
  padding-left: 7px;
  text-transform: capitalize;
  ${({ $editing }): string =>
    $editing
      ? ``
      : `
      padding-right: 7px;
      `}
  word-spacing: -3px;
`;

export const IconContainer = styled.div`
  position: absolute;
  font-size: 45px;
  color: #ffffff;
  background: #00000030;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const CloseIconStyled = styled(CloseIcon)`
  margin: unset;

  &:hover {
    cursor: pointer;
  }
`;

export const EditDeleteButtons = styled.div`
  color: #c9c9c9;
  margin-left: auto;
  display: flex;
`;

export const ButtonContainer = styled.div`
  opacity: 0.7;
  display: flex;
  /* &:hover {
    opacity: 1;
    cursor: pointer;
  } */
`;

export const Summary = styled(Section)`
  flex: 1;
  z-index: 10;
`;

export const SummarySection = styled(Section)``;

export const SummaryItem = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #7881902e;
  padding-bottom: 7px;
  align-items: center;
`;

export const SummaryItemTitle = styled.span`
  color: #888888;
  font-size: 14px;
  display: flex;
`;
export const SummaryItemValue = styled.span<{ $isPositive?: boolean }>`
  color: ${({ $isPositive = true }): string =>
    $isPositive ? color("SystemLightGreen") : color("SystemRed")};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
export const SummaryItemValueSubtext = styled.span`
  color: #888888;
  font-size: 14px;
`;

export const SummaryItemPnL = styled.span<{ $isPositive?: boolean }>`
  color: ${({ $isPositive = true }): string =>
    $isPositive ? color("SystemLightGreen") : color("SystemRed")};
  font-size: 20px;
`;

export const DescriptionSection = styled(Section)`
  padding-left: ${CONTAINER_MARGIN_SMALL}px;
  padding-right: 20px;
`;

export const DescriptionText = styled.div`
  color: #888888;
  font-size: 14px;
  display: flex;
  gap: 10px;
  align-items: start;
`;

export const SummaryTitleInfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const DateTimePickerDate = styled.p`
  text-align: center;
  color: #b7b7b7;
  margin-top: unset;
`;

export const TradesDetectedTrade = styled.div`
  font-weight: 400;
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #3b4555;
`;

export const TradesDetectedPnL = styled.div<{ $positive: boolean }>`
  margin-right: 20px;
  margin-left: auto;
  color: ${({ $positive = true }): string =>
    $positive ? color("SystemLightGreen") : color("SystemRed")};
`;

export const TradesDetectedTime = styled.div`
  margin-right: 20px;
  font-weight: 100;
  margin-left: 20px;
`;

export const TradesDetectedContainer = styled.div`
  font-weight: 100;
  color: #8b8b8b;
  margin-bottom: 10px;
`;

export const TradesDetectedPnLTotalHighlighted = styled.div<{
  $positive?: boolean;
}>`
  color: ${({ $positive = true }): string =>
    $positive ? color("SystemLightGreen") : color("SystemRed")};
  margin-left: 10px;
`;

export const TradesDetectedPnLTotal = styled.div`
  margin-top: 20px;
  font-weight: 100;
  color: #8b8b8b;
  display: flex;
  justify-content: flex-start;
`;

export const TradeAccountsSelectSaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TagInputWithAIButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    color: #d5d5d5;
    height: 20px;
    width: 20px;

    &:hover {
      color: ${color("SystemLightGreen")};
      cursor: pointer;
    }
  }
`;

export const DescriptionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
