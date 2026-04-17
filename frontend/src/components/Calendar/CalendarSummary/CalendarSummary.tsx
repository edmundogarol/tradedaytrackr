import GlassTile from "@components/GlassTile/GlassTile";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useJournalEntriesApiCall from "@pages/Journal/hooks/useJournalEntriesApiCall";
import useJournalEntriesHandler from "@pages/Journal/hooks/useJournalEntriesHandler";
import useJournalState from "@pages/Journal/hooks/useJournalState";
import { m } from "@utils/utils";
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
  const { journalEntries } = useJournalState();
  const journalEntriesApiCall = useJournalEntriesApiCall();
  useJournalEntriesHandler(journalEntriesApiCall);

  return (
    <Container>
      {journalEntries.map((journalEntry, index) => {
        return (
          <TileContainer
            key={index}
            onClick={() =>
              navigation.navigate(PageEnum.JournalEntry, {
                id: journalEntry.id,
              })
            }
          >
            <GlassTile
              key={index}
              positive={journalEntry.totalPnl >= 0}
              overlay={
                <TileDate>
                  <TileDateText>
                    {m(journalEntry.dateTime).format("MMM D")}
                  </TileDateText>
                  <TileAccs>{`x${journalEntry.accountCount} Accs`}</TileAccs>
                  <TileInfo>
                    <TilePnL $positive={journalEntry.totalPnl >= 0}>
                      ${journalEntry.totalPnl}
                    </TilePnL>
                    <TileTradeCount className="trade-count">
                      {`${journalEntry.trades?.length} trade${
                        journalEntry.trades?.length !== 1 ? "s" : ""
                      }`}
                    </TileTradeCount>
                  </TileInfo>
                </TileDate>
              }
            >
              <TradePreviewOverlay>
                <TradePreview $src={journalEntry.imageUrl} />
              </TradePreviewOverlay>
            </GlassTile>
          </TileContainer>
        );
      })}
    </Container>
  );
};

export default CalendarSummary;
