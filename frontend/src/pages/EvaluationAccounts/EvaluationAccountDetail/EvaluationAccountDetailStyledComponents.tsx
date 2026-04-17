import { color } from "@styles/colors";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  z-index: 10;
  width: 100%;
`;

export const AccountNameContainer = styled.div`
  color: ${color("SystemTitleWhite")};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

export const AccountName = styled.p`
  margin: unset;
  font-weight: 400;
  align-items: center;
  display: flex;
  flex: 3;
`;

export const AccountDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 250px;
`;

export const AccountType = styled.div`
  color: ${color("SystemLabel1")};
  font-size: 14px;
  border-top: 1px solid #787878;
  margin-top: 3px;
  padding-top: 4px;
`;

export const AccountPerformanceContainer = styled.div`
  margin-left: 20px;
  display: flex;
  gap: 10px;
  flex: 1;
`;

export const ListHeaders = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  color: #888888;
  font-weight: 200;
`;

export const BufferHeader = styled.div`
  flex: 1.6;
  display: flex;
  justify-content: center;
  @media (max-width: 799px) {
    display: none;
  }
`;

export const PnLHeader = styled.div`
  flex: 1.4;
  display: flex;
  justify-content: center;
  @media (max-width: 799px) {
    display: none;
  }
`;

export const TradingDaysContainer = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export const TradePreviewContainer = styled.div`
  width: 85px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
`;

export const TradeDay = styled.div`
  height: 63px;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
  gap: 10px;
  justify-content: space-between;
`;

export const DayValue = styled.div`
  background-color: #3c5070f5;
  color: #d8d8d8;
  width: 40px;
  height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const PnL = styled.div<{ $positive: boolean }>`
  color: ${(props): string =>
    props.$positive ? color("SystemBlue5") : color("SystemRed")};
  font-size: 20px;
  width: 100px;
`;

export const PreviewDayValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const DateContainer = styled.div`
  color: ${color("SystemLabel1")};
  font-size: 14px;
  width: 100px;
`;

export const ConsistencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex: 1;
`;

export const ConsistencyLabel = styled.span`
  display: flex;
  color: ${color("SystemLabel1")};
  font-size: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Time = styled.div`
  color: ${color("SystemLabel1")};
  font-size: 14px;
  width: 100px;
`;

export const EditContainer = styled.div`
  color: ${color("SystemLabel1")};
  font-size: 14px;
`;

export const TradingDaysHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const EditDeleteContainer = styled.div`
  display: flex;
  padding: 10px;
`;
