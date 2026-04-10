import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import EditIcon from "@mui/icons-material/Edit";
import {
  PageContainer as Container,
  DropdownsSection,
  SectionTitle,
} from "@styles/globalStyledComponents";
import React from "react";

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
import { formatter } from "@utils/utils";
import moment from "moment";
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

  const sortByOptions = {
    title: "Sort By",
    items: [
      { name: "Date", value: "date" },
      { name: "PnL", value: "pnl" },
      { name: "Accounts Count", value: "accounts_count" },
    ],
  };

  return (
    <Page topBarShowMenu={true}>
      <Container>
        <SectionTitle>Journal</SectionTitle>
        <Gap level={1} />
        <DropdownsSection>
          <DropdownMultiselect {...sortByOptions} singleSelect />
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
          {[...journalEntries].reverse().map((entry, index) => (
            <GlassTile
              key={index}
              featureTile
              minHeight={10}
              minWidth={10}
              padding={7}
              noGlow={true}
              overlay={
                <TileTradeCountContainer>
                  <InfoPopout infoDescription="2x Apex, 4x Mffu">
                    <TileTradeCount className="trade-count">{`x${entry.accountCount} acc`}</TileTradeCount>
                  </InfoPopout>
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
                    <TradePreview $idx={index} />
                  </TradePreviewContainer>
                  <DateContainer>
                    {moment().add(index, "days").format("MMM D, YYYY")}
                    <Time>{`10:${index}0 AM`}</Time>
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
