import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import EditIcon from "@mui/icons-material/Edit";
import {
  PageContainer as Container,
  DropdownsSection,
  SectionTitle,
} from "@styles/globalStyledComponents";
import React, { useMemo } from "react";

import Button from "@components/Button/Button";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";
import GlassTile from "@components/GlassTile/GlassTile";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import {
  DateContainer,
  PnL,
  PreviewDayValueContainer,
  Time,
  TradeDay,
  TradePreview,
  TradePreviewContainer,
} from "@pages/FundedAccounts/FundedAccountDetail/FundedAccountDetailStyledComponents";
import { formatter, m } from "@utils/utils";

import useJournalEntriesApiCall from "./hooks/useJournalEntriesApiCall";
import useJournalEntriesHandler from "./hooks/useJournalEntriesHandler";
import useJournalState from "./hooks/useJournalState";
import {
  Description,
  EditContainer,
  JournalEntries,
  TileTradeCount,
  TileTradeCountContainer,
} from "./JournalStyledComponents";
import styles from "./JournalStyles";

const Journal: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const { journalEntries } = useJournalState();
  const journalEntriesApiCall = useJournalEntriesApiCall();
  useJournalEntriesHandler(journalEntriesApiCall);
  const [sortByFilter, setSortByFilter] = React.useState("date");

  const sortByOptions = {
    title: "Sort By",
    items: [
      { name: "Date", value: "date" },
      { name: "PnL", value: "pnl" },
      { name: "Accounts Count", value: "accounts_count" },
    ],
  };

  const filteredJournalEntries = useMemo(() => {
    return [...journalEntries].sort((a, b) => {
      switch (sortByFilter) {
        case "date":
          return (
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
          );
        case "pnl":
          return Number(b.totalPnl) - Number(a.totalPnl);
        case "accounts_count":
          return b.accountCount - a.accountCount;
        default:
          return 0;
      }
    });
  }, [journalEntries, sortByFilter]);

  return (
    <Page topBarShowMenu={true}>
      <Container>
        <SectionTitle>Journal</SectionTitle>
        <Gap level={1} />
        <DropdownsSection>
          <DropdownMultiselect
            {...sortByOptions}
            singleSelect
            onSelect={(selected) => {
              setSortByFilter(selected[0] as string);
            }}
          />
          <Button
            onClick={() =>
              navigation.navigate(PageEnum.JournalEntry, {
                id: "new",
              })
            }
            text={"Add Entry"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
          />
        </DropdownsSection>
        <JournalEntries>
          {filteredJournalEntries.map((entry, index) => (
            <GlassTile
              key={index}
              featureTile
              minHeight={10}
              minWidth={10}
              padding={7}
              noGlow={true}
              overlay={
                <TileTradeCountContainer>
                  {/* <InfoPopout infoDescription="2x Apex, 4x Mffu"> */}
                  <TileTradeCount className="trade-count">{`x${entry.accountCount} acc`}</TileTradeCount>
                  {/* </InfoPopout> */}
                </TileTradeCountContainer>
              }
            >
              <TradeDay
                onClick={() =>
                  navigation.navigate(PageEnum.JournalEntry, {
                    id: entry.id,
                  })
                }
              >
                <PreviewDayValueContainer>
                  <TradePreviewContainer>
                    <TradePreview $src={entry.image} />
                  </TradePreviewContainer>
                  <DateContainer>
                    {m(entry.dateTime).format("MMM D, YYYY")}
                    <Time>{m(entry.dateTime).format("h:mm A")}</Time>
                  </DateContainer>
                </PreviewDayValueContainer>
                <Description>{entry.description}</Description>
                <PnL $positive={entry.totalPnl >= 0}>
                  {formatter.format(entry.totalPnl)}
                </PnL>
                <InfoPopout infoDescription="Edit Details">
                  <EditContainer>
                    <EditIcon
                      style={styles.editIcon}
                      onClick={() => {
                        navigation.navigate(PageEnum.JournalEntry, {
                          id: entry.id,
                        });
                      }}
                    />
                  </EditContainer>
                </InfoPopout>
              </TradeDay>
            </GlassTile>
          ))}
        </JournalEntries>
      </Container>
    </Page>
  );
};

export default Journal;
