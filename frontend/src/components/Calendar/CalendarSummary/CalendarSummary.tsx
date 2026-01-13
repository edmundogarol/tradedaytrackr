import React from "react";
import GlassTile from "@components/GlassTile/GlassTile";
import {
  CalendarSummaryContainer,
  CalendarSummaryTileDate,
  CalendarSummaryTileDateText,
  CalendarSummaryTileInfo,
  CalendarSummaryTilePnL,
  CalendarSummaryTileTradeCount,
  CalendarSummaryTradePreview,
  CalendarSummaryTradePreviewOverlay,
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
        const positivePnL = parseFloat(randomPnL) >= 0;
        return (
          <GlassTile
            key={index}
            positive={positivePnL}
            overlay={
              <CalendarSummaryTileDate>
                <CalendarSummaryTileDateText>
                  Dec {index + 1}
                </CalendarSummaryTileDateText>
                <CalendarSummaryTileInfo>
                  <CalendarSummaryTilePnL $positive={positivePnL}>
                    ${randomPnL}
                  </CalendarSummaryTilePnL>
                  <CalendarSummaryTileTradeCount className="trade-count">
                    {`${randomTradeCount} trade${
                      randomTradeCount !== 1 ? "s" : ""
                    }`}
                  </CalendarSummaryTileTradeCount>
                </CalendarSummaryTileInfo>
              </CalendarSummaryTileDate>
            }
          >
            <CalendarSummaryTradePreviewOverlay>
              <CalendarSummaryTradePreview $idx={index} />
            </CalendarSummaryTradePreviewOverlay>
          </GlassTile>
        );
      })}
    </CalendarSummaryContainer>
  );
};

export default CalendarSummary;
