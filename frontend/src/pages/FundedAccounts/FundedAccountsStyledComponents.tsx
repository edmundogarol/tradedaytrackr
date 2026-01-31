import { Box, Collapse } from "@mui/material";
import styled from "styled-components";

export const FundedAccountsContainer = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 300px;
  width: 100%;
`;

export const FundedAccountsTitle = styled.h1`
  padding-left: 10px;
  font-size: 15px;
  font-weight: 100;
  margin: 0;
  color: #a8a8a8;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 5px;
`;

export const FundedAccountsDropdownsSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const FundedAccountsListHeaders = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  color: #888888;
  font-weight: 200;
  min-width: 972px;
  overflow: scroll;
`;

export const FundedAccountsListHeadersAccount = styled.div`
  margin-left: 20px;
  flex: 1.8;
`;

export const FundedAccountsListHeadersDays = styled.div`
  flex: 2.2;
`;

export const FundedAccountsListHeadersBuffer = styled.div`
  flex: 1.6;
`;

export const FundedAccountsListHeadersPnL = styled.div`
  flex: 1;
`;

export const FundedAccountsListHeadersItem = styled.span``;

export const FundedAccountsListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  background: #ffffff0f;
  border-radius: 5px;
  padding: 10px;
  min-width: 972px;
  overflow: scroll;
`;

export const CollapseStyled = styled(Collapse)`
  position: absolute;
  right: 50px;
  width: max-content;
  left: 100%;
  z-index: 10;
  top: 0px;
`;

export const BoxContainer = styled(Box)`
  height: 200px;
  max-height: 240px;
  overflow: scroll;
  border-radius: 5px;
`;

export const DropdownContainer = styled.div`
  height: 200px;
  max-height: 240px;
  overflow: scroll;
  background-color: #626a7aa6;
  border-radius: 5px;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(155, 155, 155, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const FundedAccountListItemContainer = styled.div`
  z-index: 10;
  width: 100%;
`;

export const FundedAccountListItemAccount = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  gap: 10px;
`;

export const FundedAccountListItemAccountImage = styled.img`
  height: 40px;
  width: 40px;
`;

export const FundedAccountListItemAccountTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FundedAccountListItemAccountTitle = styled.span`
  font-size: 16px;
  color: #b5b5b5;
`;

export const FundedAccountListItemAccountSubtitle = styled.span`
  font-size: 14px;
  color: #989898;
`;

export const FundedAccountListItemAccountSubtitleHighlighted = styled.span`
  margin-left: 5px;
  font-size: 15px;
  color: #a9d1a9;
`;

export const FundedAccountListItemAccountDaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1.5;
`;

export const FundedAccountListItemAccountDaysItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const FundedAccountListItemAccountDaysItemValue = styled.span<{
  $positive?: boolean;
}>`
  z-index: 10;
  color: ${({ $positive }): string => ($positive ? "#85d297" : "#d56060")};
`;

export const FundedAccountListItemAccountDaysItemSubtitle = styled.span`
  color: #989898;
`;

export const FundedAccountListItemAccountBuffer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.2;
`;

export const FundedAccountListItemAccountBufferText = styled.span`
  font-size: 13px;
  color: #adadad;
  font-weight: 100;
  margin-bottom: 5px;
`;

export const FundedAccountListItemAccountBufferAmount = styled.span`
  margin-left: 5px;
  font-size: 13px;
  color: #adadad;
  font-weight: 100;
  margin-bottom: 5px;
`;

export const FundedAccountListItemAccountBufferAmountHighlighted = styled.span<{
  $bufferPercent: number;
}>`
  font-size: 13px;
  color: ${(props): string =>
    props.$bufferPercent > 70
      ? "#80ae70"
      : props.$bufferPercent > 40
      ? "#cf943b"
      : "#d56060"};
  font-weight: 100;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const FundedAccountListItemAccountPnL = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FundedAccountListItemAccountPnLValue = styled.span<{
  $bufferPercent: number;
}>`
  color: ${(props): string =>
    props.$bufferPercent > 70
      ? "#80ae70"
      : props.$bufferPercent > 40
      ? "#cf943b"
      : "#d56060"};
  font-size: 21px;
  font-weight: 100;
`;

export const FundedAccountListItemAccountPnLWithdrawable = styled.span<{
  $positive: boolean;
}>`
  color: ${(props): string => (props.$positive ? "#80ae70" : "#aeaeae")};
  font-size: 11px;
  letter-spacing: 1px;
`;
export const FundedAccountListItemAccountPnLWithdrawableText = styled.span`
  color: #aeaeae;
  font-size: 9px;
  letter-spacing: 1px;
  margin-right: 5px;
`;
