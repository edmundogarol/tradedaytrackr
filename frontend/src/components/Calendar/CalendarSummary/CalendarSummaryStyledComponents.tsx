import { devSrc } from "@utils/utils";
import styled from "styled-components";

export const CalendarSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  max-height: 260px;
  overflow: scroll;
  background: #ffffff0f;
  border-radius: 5px;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(200, 200, 200, 0.5);
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const CalendarSummaryTile = styled.div<{ $idx: number }>`
  height: 100px;
  background: #00000082;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  min-width: 150px;
  background-image: ${(props): string =>
    `url('${devSrc(`trade${props.$idx + 1}.png`)}')`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: darken;

  &:hover {
    background-blend-mode: normal;

    .trade-count {
      color: black;
    }
  }
  position: relative;
`;

export const CalendarSummaryTileDate = styled.span`
  width: 100%;
  height: 100%;
  padding: 10px;
  align-items: start;
  justify-content: start;
`;

export const CalendarSummaryTileDateText = styled.p`
  font-size: 14px;
  color: white;
  text-shadow: 1px 1px 5px black;
  margin: 0;
  position: absolute;
`;

export const CalendarSummaryTileInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
`;

export const CalendarSummaryTileResult = styled.span`
  font-size: 16px;
`;

export const CalendarSummaryTileDay = styled.span`
  font-size: 16px;
`;

export const CalendarSummaryTilePnL = styled.span<{ $positive?: boolean }>`
  font-size: 14px;

  ${(props): string =>
    props.$positive ? ` color: #a8ffa8;` : `color: #ffa7a7;`}
  ${(props): string =>
    props.$positive
      ? `   text-shadow: 1px 1px 1px black;`
      : `  text-shadow: 1px 1px 1px black;`}
`;

export const CalendarSummaryTileTradeCount = styled.span`
  font-size: 12px;
  color: #c9c9c9;
`;
