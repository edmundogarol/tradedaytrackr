import React from "react";
import {
  CalendarSummaryContainer,
  CalendarSummaryTile,
  CalendarSummaryTileDate,
  CalendarSummaryTileDateText,
  CalendarSummaryTileInfo,
  CalendarSummaryTilePnL,
  CalendarSummaryTileTradeCount,
} from "./CalendarSummaryStyledComponents";

export enum CalendarSummaryCount {
  FIVE_DAYS = 5,
  TEN_DAYS = 10,
  TWENTY_DAYS = 20,
}

interface CalendarSummaryProps {
  count: CalendarSummaryCount;
}

const CalendarSummary: React.FunctionComponent<CalendarSummaryProps> = ({
  count,
}) => {
  return (
    <CalendarSummaryContainer>
      {Array.from({ length: count }).map((_, index) => {
        const randomPnL = (Math.random() * 1000 - 500).toFixed(2);
        const randomTradeCount = Math.floor(Math.random() * 1) + 1;
        return (
          <CalendarSummaryTile key={index} $idx={index}>
            <CalendarSummaryTileDate>
              <CalendarSummaryTileDateText>
                Dec {index + 1}
              </CalendarSummaryTileDateText>
              <CalendarSummaryTileInfo>
                <CalendarSummaryTilePnL $positive={parseFloat(randomPnL) >= 0}>
                  ${randomPnL}
                </CalendarSummaryTilePnL>
                <CalendarSummaryTileTradeCount className="trade-count">
                  {`${randomTradeCount} trade${
                    randomTradeCount !== 1 ? "s" : ""
                  }`}
                </CalendarSummaryTileTradeCount>
              </CalendarSummaryTileInfo>
            </CalendarSummaryTileDate>
          </CalendarSummaryTile>
        );
      })}
    </CalendarSummaryContainer>
  );
};

export default CalendarSummary;
