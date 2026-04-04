import GlassTile from "@components/GlassTile/GlassTile";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import React from "react";
import {
  Container,
  TileAccs,
  TileContainer,
  TileDate,
  TileDateText,
  TileInfo,
  TilePnL,
  TileTradeCount,
  TradePreview,
  TradePreviewOverlay,
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
  const navigation = useReactNavigation();
  return (
    <Container>
      {Array.from({ length: count }).map((_, index) => {
        const randomPnL = (Math.random() * 1000 - 500).toFixed(2);
        const randomTradeCount = Math.floor(Math.random() * 1) + 1;
        const positivePnL = parseFloat(randomPnL) >= 0;
        return (
          <TileContainer
            key={index}
            onClick={() =>
              navigation.navigate(PageEnum.JournalEntry, {
                id: index + 1,
              })
            }
          >
            <GlassTile
              key={index}
              positive={positivePnL}
              overlay={
                <TileDate>
                  <TileDateText>Dec {index + 1}</TileDateText>
                  <TileAccs>{`x${index} Accs`}</TileAccs>
                  <TileInfo>
                    <TilePnL $positive={positivePnL}>${randomPnL}</TilePnL>
                    <TileTradeCount className="trade-count">
                      {`${randomTradeCount} trade${
                        randomTradeCount !== 1 ? "s" : ""
                      }`}
                    </TileTradeCount>
                  </TileInfo>
                </TileDate>
              }
            >
              <TradePreviewOverlay>
                <TradePreview $idx={index} />
              </TradePreviewOverlay>
            </GlassTile>
          </TileContainer>
        );
      })}
    </Container>
  );
};

export default CalendarSummary;
