import Button from "@components/Button/Button";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Page from "@components/Page/Page";
import { PageEnum } from "@interfaces/NavigationTypes";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
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
import {
  PageContainer as Container,
  DropdownsSection,
  SectionTitle,
} from "@styles/globalStyledComponents";
import { formatter, isNotEmptyString, m } from "@utils/utils";
import React, { useMemo, useState } from "react";

import AlertPopout from "@components/Alert/AlertPopout";
import ModalWrapper from "@components/Modal/Modal";
import { Collapse } from "@mui/material";
import useJournalDispatch from "./hooks/useJournalDispatch";
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
  const { journalEntries, deleteJournalEntryErrors } = useJournalState();
  const { updateDeleteJournalEntryErrors } = useJournalDispatch();
  const journalEntriesApiCall = useJournalEntriesApiCall();
  useJournalEntriesHandler(journalEntriesApiCall);
  const [sortByFilter, setSortByFilter] = useState("date");
  const [tilePreviewHovered, setTilePreviewHovered] = useState<number | null>(
    null,
  );
  const [openJournalEntryImageModal, setOpenJournalEntryImageModal] = useState<
    string | null
  >(null);

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
      <ModalWrapper
        backdropClose={() => setOpenJournalEntryImageModal(null)}
        title="Quick Preview"
        open={!!openJournalEntryImageModal}
        setOpen={() => setOpenJournalEntryImageModal(null)}
      >
        <img
          src={openJournalEntryImageModal as string}
          style={{
            width: "100%",
            maxHeight: 400,
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      </ModalWrapper>
      <AlertPopout
        setPopoutOpen={() => updateDeleteJournalEntryErrors({})}
        hideDuration={4000}
        open={isNotEmptyString(deleteJournalEntryErrors?.detail)}
        message={deleteJournalEntryErrors?.detail}
      />
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
          {filteredJournalEntries.map((entry, index) => {
            return (
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
                <TradeDay>
                  <PreviewDayValueContainer>
                    <TradePreviewContainer>
                      <TradePreview
                        $src={entry.imageUrl}
                        onMouseEnter={() => setTilePreviewHovered(entry.id)}
                        onClick={() => {
                          navigation.navigate(PageEnum.JournalEntry, {
                            id: entry.id,
                          });
                        }}
                      />
                    </TradePreviewContainer>
                    <Collapse
                      orientation="horizontal"
                      in={tilePreviewHovered === entry.id}
                    >
                      <VisibilityOutlinedIcon
                        style={{ color: "#e0e0e0a6" }}
                        onClick={() =>
                          setOpenJournalEntryImageModal(entry.imageUrl)
                        }
                      />
                    </Collapse>
                    <DateContainer>
                      {m(entry.dateTime).format("MMM D, YYYY")}
                      <Time>{m(entry.dateTime).format("h:mm A")}</Time>
                    </DateContainer>
                  </PreviewDayValueContainer>
                  <Description
                    onClick={() => {
                      navigation.navigate(PageEnum.JournalEntry, {
                        id: entry.id,
                      });
                    }}
                  >
                    {entry.description}
                  </Description>
                  <PnL
                    $positive={entry.totalPnl >= 0}
                    onClick={() => {
                      navigation.navigate(PageEnum.JournalEntry, {
                        id: entry.id,
                      });
                    }}
                  >
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
            );
          })}
        </JournalEntries>
      </Container>
    </Page>
  );
};

export default Journal;
