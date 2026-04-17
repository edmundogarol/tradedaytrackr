import { Box, Collapse } from "@mui/material";
import { color } from "@styles/colors";
import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 300px;
  width: 100%;
`;

export const Title = styled.h1`
  padding-left: 10px;
  font-size: 15px;
  font-weight: 100;
  margin: 0;
  color: #a8a8a8;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 5px;
  flex: 4.9;
`;

export const DropdownsSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const ListHeaders = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  color: #888888;
  font-weight: 200;
  min-width: 972px;
`;

export const AccountHeader = styled.div`
  margin-left: 20px;
  flex: 1.8;
`;

export const DaysHeader = styled.div`
  flex: 2.2;
`;

export const BufferHeader = styled.div`
  flex: 1.6;
`;

export const PnLHeader = styled.div`
  flex: 1;
`;

export const ListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  background: #ffffff0f;
  border-radius: 5px;
  padding: 10px;
  min-width: 972px;
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

export const ListItemContainer = styled.div`
  z-index: 10;
  width: 100%;
  display: flex;
  flex: 2;
  align-items: center;
  gap: 10px;
`;

export const AccountImage = styled.div<{ $image: string }>`
  height: 40px;
  width: 40px;
  background-image: url(${(props): string => props.$image});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export const AccountTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const AccountTitle = styled.span`
  font-size: 16px;
  color: #b5b5b5;
  font-size: 16px;
  color: #b5b5b5;
  cursor: pointer;
  pointer-events: auto;
  &:hover {
    text-decoration: underline;
  }
`;

export const AccountSubtitle = styled.span`
  font-size: 14px;
  color: #989898;
`;

export const AccountTradingDaysComplete = styled.span`
  font-size: 14px;
  color: #989898;
  display: flex;
`;

export const AccountSubtitleHighlighted = styled.span`
  margin-left: 5px;
  font-size: 15px;
  color: ${color("SystemBlue5")};
`;

export const DaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1.7;
`;

export const DaysItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const DaysItemValue = styled.span<{
  $positive?: boolean;
}>`
  z-index: 10;
  color: ${({ $positive }): string =>
    $positive ? color("SystemBlue5") : "#d56060"};
  pointer-events: auto;
  min-width: 25px;
  text-align: center;
  cursor: pointer;
`;

export const BufferContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.2;
`;

export const BufferText = styled.span`
  font-size: 13px;
  color: #adadad;
  font-weight: 100;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const BufferAmount = styled.span`
  margin-left: 5px;
  font-size: 13px;
  color: #adadad;
  font-weight: 100;
`;

export const BufferAmountHighlighted = styled.span<{
  $bufferPercent: number;
}>`
  font-size: 13px;
  color: ${(props): string =>
    props.$bufferPercent > 60 ? color("SystemBlue5") : "#cf943b"};
  font-weight: 100;
  margin-left: 5px;
  margin-right: 5px;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.span<{
  $bufferPercent: number;
}>`
  color: ${(props): string =>
    props.$bufferPercent > 60 ? color("SystemBlue5") : "#cf943b"};
  font-size: 17px;
  font-weight: 100;
`;
