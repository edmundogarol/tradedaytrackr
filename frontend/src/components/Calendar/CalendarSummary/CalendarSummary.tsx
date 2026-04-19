import GlassTile from "@components/GlassTile/GlassTile";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import { PageEnum } from "@interfaces/NavigationTypes";
import PhotoIcon from "@mui/icons-material/Photo";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useJournalEntriesHandler from "@pages/Journal/hooks/useJournalEntriesHandler";
import useJournalState from "@pages/Journal/hooks/useJournalState";
import { HorizontalSection, SectionText } from "@styles/globalStyledComponents";
import { m } from "@utils/utils";
import React, { useEffect } from "react";
import {
  Container,
  TileAccs,
  TileContainer,
  TileDate,
  TileDateText,
  TileInfo,
  TilePnL,
  TradePreview,
  TradePreviewOverlay,
} from "./CalendarSummaryStyledComponents";
import styles from "./CalendarSummaryStyles";

const CalendarSummary: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const { journalEntries } = useJournalState();
  const { getJournalEntries } = useJournalEntriesHandler();

  const emptyActivity = journalEntries.length === 0;

  useEffect(() => {
    getJournalEntries(1);
  }, []);

  return (
    <Container style={emptyActivity ? styles.emptyPage : {}}>
      <If condition={journalEntries.length === 0}>
        <HorizontalSection>
          <SectionText>No recent activity.</SectionText>
          <InfoPopout infoDescription="Create journal entries to see them here." />
        </HorizontalSection>
      </If>
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
                    {/* <TileTradeCount className="trade-count">
                      {`${journalEntry.trades?.length} trade${
                        journalEntry.trades?.length !== 1 ? "s" : ""
                      }`} 
                    </TileTradeCount> */}
                  </TileInfo>
                </TileDate>
              }
            >
              <TradePreviewOverlay>
                <If condition={!!journalEntry.imageUrl}>
                  <TradePreview $src={journalEntry.imageUrl} />
                  <Else>
                    <TradePreview $src="" style={styles.previewContainer}>
                      <PhotoIcon style={styles.previewIcon} />
                    </TradePreview>
                  </Else>
                </If>
              </TradePreviewOverlay>
            </GlassTile>
          </TileContainer>
        );
      })}
    </Container>
  );
};

export default CalendarSummary;
