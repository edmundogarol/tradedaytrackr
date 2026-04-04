import AlertPopout from "@components/Alert/AlertPopout";
import Button from "@components/Button/Button";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import CalendarPicker from "@components/Input/CalendarPicker/CalendarPicker";
import Input from "@components/Input/Input";
import Loading from "@components/Loading/Loading";
import Modal from "@components/Modal/Modal";
import Page from "@components/Page/Page";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import Checkbox from "@mui/material/Checkbox";
import { color } from "@styles/colors";
import { BUTTON_WIDTH } from "@styles/constants";
import {
  PageContainer as Container,
  Section,
  SectionTitle,
  SubsectionHeader,
} from "@styles/globalStyledComponents";
import { devSrc, formatter, isNotEmptyString, sanitizeTag } from "@utils/utils";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import useGenerateDraftAIHandler from "../hooks/useGenerateDraftAIHandler";
import useGenerateTagsAIHandler from "../hooks/useGenerateTagsAIHandler";
import useJournalDispatch from "../hooks/useJournalDispatch";
import useJournalState from "../hooks/useJournalState";
import type { JournalEntry as JournalEntryType } from "../JournalInterfaces";
import { initialState } from "../JournalState";
import { mockJournalEntries } from "../mocks/journalEntries";
import { availableAccountTradesOnDateMock } from "../mocks/tradesOnDate";
import {
  ButtonContainer,
  CloseIconStyled,
  DateTimePickerDate,
  DescriptionButtonsContainer,
  DescriptionSection,
  DescriptionText,
  EditDeleteButtons,
  EntryDetails,
  EntryInfoContainer,
  IconContainer,
  Summary,
  SummaryItem,
  SummaryItemPnL,
  SummaryItemTitle,
  SummaryItemValue,
  SummaryItemValueSubtext,
  SummarySection,
  SummaryTitleInfoContainer,
  Tag,
  TagContainer,
  TagInputContainer,
  TagInputWithAIButtonContainer,
  TagsContainer,
  TradeAccountsSelectSaveButtonContainer,
  TradeCapture,
  TradeImage,
  TradeInfo,
  TradesDetectedContainer,
  TradesDetectedPnL,
  TradesDetectedPnLTotal,
  TradesDetectedPnLTotalHighlighted,
  TradesDetectedTime,
  TradesDetectedTrade,
  TradeSingleAccountInfo,
  TradeSubtitle,
  TradeSubtitleEditing,
} from "./JournalEntryStyledComponents";
import styles from "./JournalEntryStyles";

const JournalEntry: React.FunctionComponent = () => {
  const [originalJournalEntry, setOriginalJournalEntry] =
    useState<JournalEntryType>(initialState.journalEntry);
  const { generateTags, loading: generateTagsLoading } =
    useGenerateTagsAIHandler();
  const { generateDraft, loading: generateDraftLoading } =
    useGenerateDraftAIHandler();
  const { journalEntry, detectedTrades, journalErrors } = useJournalState();
  const { updateJournalEntry, updateDetectedTrades, updateJournalErrors } =
    useJournalDispatch();
  let [searchParams] = useSearchParams();
  const [editing, setEditing] = useState(
    searchParams.get("id") === "new" || false,
  );
  const [editingDate, setEditingDate] = useState(false);
  const [editingAccounts, setEditingAccounts] = useState(false);
  const [selectedAccountTrades, setSelectedAccountTrades] = useState<number[]>([
    ...journalEntry.trades,
  ]);
  const [currentTagInput, setCurrentTagInput] = useState("");
  const saveDisabled =
    journalEntry.contracts <= 0 ||
    journalEntry.risk <= 0 ||
    journalEntry.instrument === "";

  const totalPnL = useMemo(() => {
    return journalEntry.trades
      .map((tradeId) => {
        const trade = detectedTrades.find((t) => t.id === tradeId);
        return trade ? trade.pnl : 0;
      })
      .reduce((sum, pnl) => sum + pnl, 0);
  }, [journalEntry.trades]);

  useEffect(() => {
    const currentEntry = mockJournalEntries.find(
      (entry) => entry.id === parseInt(searchParams.get("id") || "0"),
    );
    if (searchParams.get("id") === "new") {
      updateJournalEntry(initialState.journalEntry);
      return;
    }
    if (currentEntry) {
      updateJournalEntry(currentEntry);
      setOriginalJournalEntry(currentEntry);
    }

    updateDetectedTrades(availableAccountTradesOnDateMock);
  }, [searchParams]);

  useEffect(() => {
    if (editingAccounts) {
      setSelectedAccountTrades(journalEntry.trades);
    }
  }, [editingAccounts, journalEntry.trades]);

  const detectedTradesPnL = useMemo(() => {
    return detectedTrades
      .filter((trade) => selectedAccountTrades.includes(trade.id))
      .reduce((total, trade) => total + trade.pnl, 0);
  }, [detectedTrades, selectedAccountTrades]);

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        setPopoutOpen={() => updateJournalErrors({ detail: "" })}
        hideDuration={4000}
        open={isNotEmptyString(journalErrors.detail)}
        message={journalErrors?.detail}
      />
      <Modal
        open={editingAccounts}
        setOpen={setEditingAccounts}
        title="Select Accounts Trades"
        onClose={() => {
          setEditingAccounts(false);
          updateJournalEntry({
            ...journalEntry,
            trades: journalEntry.trades,
          });
        }}
      >
        <TradesDetectedContainer>
          {`${detectedTrades.length} trades detected for ${moment(journalEntry.date_time).format("MMM DD")}`}
        </TradesDetectedContainer>
        <TradesDetectedContainer>
          {detectedTrades.map((trade) => {
            return (
              <TradesDetectedTrade key={trade.id}>
                <Checkbox
                  sx={{ color: "#a9b1c2" }}
                  checked={selectedAccountTrades.includes(trade.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAccountTrades((prev) => [...prev, trade.id]);
                    } else {
                      setSelectedAccountTrades((prev) =>
                        prev.filter((id) => id !== trade.id),
                      );
                    }
                  }}
                />
                <div>{trade.accountName}</div>
                <TradesDetectedTime>
                  {moment(trade.date).format("hh:mm A")}
                </TradesDetectedTime>
                <TradesDetectedPnL
                  $positive={trade.pnl >= 0}
                >{`$${trade.pnl}`}</TradesDetectedPnL>
              </TradesDetectedTrade>
            );
          })}
        </TradesDetectedContainer>
        <TradesDetectedPnLTotal>
          {`Total selected PnL: `}
          <TradesDetectedPnLTotalHighlighted $positive={detectedTradesPnL >= 0}>
            {formatter.format(detectedTradesPnL)}
          </TradesDetectedPnLTotalHighlighted>
        </TradesDetectedPnLTotal>
        <TradeAccountsSelectSaveButtonContainer>
          <Button
            onClick={() => {
              setEditingAccounts(false);
              updateJournalEntry({
                ...journalEntry,
                trades: selectedAccountTrades,
              });
            }}
            text={"Save"}
            style={{ background: color("SystemGreen"), width: BUTTON_WIDTH }}
          />
        </TradeAccountsSelectSaveButtonContainer>
      </Modal>
      <Container>
        <SectionTitle>Journal Entry</SectionTitle>
        <Gap level={1} />
        <EntryInfoContainer>
          <EntryDetails>
            <GlassTile
              featureTile
              minHeight={10}
              minWidth={10}
              padding={7}
              noGlow={true}
            >
              <Section>
                <TradeInfo>
                  <If condition={editing}>
                    <TradeSubtitleEditing onClick={() => setEditingDate(true)}>
                      {moment(journalEntry.date_time).format(
                        "YYYY-MM-DD hh:mm A",
                      )}
                    </TradeSubtitleEditing>
                    <DateTimePickerDate />
                    <CalendarPicker
                      onSaveCallback={(pickerOpen) => {
                        setEditingDate(pickerOpen);
                      }}
                      showPicker={editingDate}
                      value={moment(journalEntry.date_time)}
                      onChange={(val) =>
                        updateJournalEntry({
                          ...journalEntry,
                          date_time: val
                            ? val.toISOString()
                            : journalEntry.date_time,
                        })
                      }
                    />
                    <Else>
                      <TradeSubtitle>
                        {moment(journalEntry.date_time).format(
                          "YYYY-MM-DD HH:mm A",
                        )}
                      </TradeSubtitle>
                    </Else>
                  </If>
                  <If condition={editing}>
                    <TradeSubtitleEditing
                      onClick={() => setEditingAccounts(true)}
                    >
                      {`${journalEntry.trades.length} Accounts`}
                    </TradeSubtitleEditing>
                    <Else>
                      <TradeSubtitle>{`${journalEntry.trades.length} Accounts`}</TradeSubtitle>
                    </Else>
                  </If>
                  <TagInputContainer>
                    <TagInputWithAIButtonContainer>
                      <If condition={editing}>
                        <Input
                          darkMode
                          type="text"
                          maxInputLength={35}
                          placeholder="Enter tag"
                          onChange={(e) => setCurrentTagInput(e.target.value)}
                          onEnterPress={(val) => {
                            if (
                              journalEntry.tags.some(
                                (tag) =>
                                  tag.toLowerCase() === val.toLowerCase(),
                              )
                            ) {
                              setCurrentTagInput("");
                              return;
                            }
                            updateJournalEntry({
                              ...journalEntry,
                              tags: [...journalEntry.tags, val],
                            });
                            setCurrentTagInput("");
                          }}
                          onSuggestionClick={(suggestion) => {
                            updateJournalEntry({
                              ...journalEntry,
                              tags: [...journalEntry.tags, suggestion],
                            });
                            setCurrentTagInput("");
                          }}
                          value={currentTagInput}
                          style={styles.tagInput}
                          inputContainerStyle={styles.tagInputContainer}
                          suggestions={[
                            {
                              description: "Momentum",
                            },
                            {
                              description: "Reaction",
                            },
                            {
                              description: "50% Block",
                            },
                            {
                              description: "Premium",
                            },
                            {
                              description: "Discount",
                            },
                            {
                              description: "IFVG",
                            },
                            {
                              description: "Long",
                            },
                            {
                              description: "Short",
                            },
                          ].filter(
                            (s) =>
                              journalEntry.tags.every(
                                (tag) =>
                                  tag.toLowerCase() !==
                                  s.description.toLowerCase(),
                              ) &&
                              s.description
                                .toLowerCase()
                                .includes(currentTagInput.toLowerCase()),
                          )}
                        />
                        <InfoPopout
                          infoDescription={
                            "Auto generate tags based on trade description"
                          }
                        >
                          <If condition={generateTagsLoading}>
                            <Loading size={20} />
                            <Else>
                              <AutoFixHighIcon
                                style={{ marginLeft: 5 }}
                                onClick={() => {
                                  generateTags(journalEntry.description);
                                }}
                              />
                            </Else>
                          </If>
                        </InfoPopout>
                        <InfoPopout infoDescription={"Clear tags"}>
                          <DeleteOutlineIcon
                            onClick={() => {
                              updateJournalEntry({
                                ...journalEntry,
                                tags: [],
                              });
                            }}
                          />
                        </InfoPopout>
                      </If>
                    </TagInputWithAIButtonContainer>
                    <TagsContainer>
                      {journalEntry.tags.map((tag, index) => (
                        <TagContainer key={index}>
                          <Tag $editing={editing}>
                            #{sanitizeTag(tag)}
                            <If condition={editing}>
                              <CloseIconStyled
                                style={{
                                  height: 15,
                                }}
                                onClick={() => {
                                  updateJournalEntry({
                                    ...journalEntry,
                                    tags: journalEntry.tags.filter(
                                      (t) =>
                                        t.toLowerCase() !== tag.toLowerCase(),
                                    ),
                                  });
                                }}
                              />
                            </If>
                          </Tag>
                        </TagContainer>
                      ))}
                      <InfoPopout
                        infoDescription={
                          "Tags will be used for Trade Stats* [Upcoming Feature]"
                        }
                      />
                    </TagsContainer>
                  </TagInputContainer>
                  <EditDeleteButtons>
                    <ButtonContainer>
                      <If condition={editing}>
                        <TradeSubtitleEditing
                          $disabled={saveDisabled}
                          onClick={() =>
                            saveDisabled ? null : setEditing(false)
                          }
                        >
                          {"Save"}
                        </TradeSubtitleEditing>
                        <TradeSubtitleEditing
                          onClick={() => {
                            setEditing(false);
                            updateJournalEntry(originalJournalEntry);
                          }}
                        >
                          {"Cancel"}
                        </TradeSubtitleEditing>
                        <Else>
                          <EditIcon
                            style={styles.editIcon}
                            onClick={() => setEditing(true)}
                          />
                        </Else>
                      </If>
                    </ButtonContainer>
                    <ButtonContainer>
                      <DeleteOutlineIcon
                        style={styles.editIcon}
                        onClick={() => alert("Delete Trade")}
                      />
                    </ButtonContainer>
                  </EditDeleteButtons>
                </TradeInfo>
                <TradeCapture>
                  <div>
                    <TradeImage
                      $src={
                        searchParams.get("id") === "new"
                          ? ""
                          : devSrc("trade1.png")
                      }
                    >
                      <If condition={editing}>
                        <IconContainer>
                          <WallpaperIcon style={{ fontSize: 60 }} />
                        </IconContainer>
                      </If>
                    </TradeImage>
                  </div>
                  <TradeSingleAccountInfo>
                    <SummaryItem>
                      <SummaryItemTitle>
                        Risk
                        <InfoPopout
                          infoDescription={`Average across all accounts. Individual account risk may vary based on entry price and contracts traded.`}
                        />
                      </SummaryItemTitle>
                      <If condition={editing}>
                        <SummaryItemValue>
                          <Input
                            darkMode
                            type="number"
                            onChange={(e) =>
                              updateJournalEntry({
                                ...journalEntry,
                                risk: parseInt(e.target.value),
                              })
                            }
                            defaultValue={journalEntry.risk}
                            style={styles.input}
                          />
                        </SummaryItemValue>
                        <Else>
                          <SummaryItemValue>
                            ${journalEntry.risk}
                          </SummaryItemValue>
                        </Else>
                      </If>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemTitle>
                        Contracts
                        <InfoPopout
                          infoDescription={`Contracts traded on single account. Total contracts across all accounts may be higher.`}
                        />
                      </SummaryItemTitle>
                      <If condition={editing}>
                        <SummaryItemValue>
                          <Input
                            darkMode
                            type="number"
                            onChange={(e) =>
                              updateJournalEntry({
                                ...journalEntry,
                                contracts: parseInt(e.target.value),
                              })
                            }
                            defaultValue={journalEntry.contracts}
                            style={styles.input}
                          />
                        </SummaryItemValue>
                        <Else>
                          <SummaryItemValue>
                            x{journalEntry.contracts}
                          </SummaryItemValue>
                        </Else>
                      </If>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemTitle>Outcome</SummaryItemTitle>
                      <If condition={editing}>
                        <SummaryItemValue>
                          <Input
                            darkMode
                            type="number"
                            onChange={(e) =>
                              updateJournalEntry({
                                ...journalEntry,
                                outcome: parseInt(e.target.value),
                              })
                            }
                            defaultValue={journalEntry.outcome}
                            style={styles.input}
                          />
                        </SummaryItemValue>
                        <Else>
                          <SummaryItemValue
                            $isPositive={journalEntry.outcome >= 0}
                          >
                            {formatter.format(journalEntry.outcome)}
                          </SummaryItemValue>
                        </Else>
                      </If>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemTitle>RR</SummaryItemTitle>
                      <SummaryItemValue $isPositive={journalEntry.outcome >= 0}>
                        {Number.isFinite(
                          journalEntry.outcome / journalEntry.risk,
                        )
                          ? (journalEntry.outcome / journalEntry.risk).toFixed(
                              2,
                            )
                          : "N/A"}
                      </SummaryItemValue>
                    </SummaryItem>
                  </TradeSingleAccountInfo>
                </TradeCapture>
                <Gap level={1} />
                <DescriptionSection>
                  <SubsectionHeader>Description</SubsectionHeader>
                  <If condition={editing}>
                    <DescriptionText>
                      <textarea
                        maxLength={1000}
                        onChange={(e) =>
                          updateJournalEntry({
                            ...journalEntry,
                            description: e.target.value,
                          })
                        }
                        value={journalEntry.description}
                        style={{
                          height: 100,
                          width: "100%",
                          resize: "none",
                          padding: 5,
                          fontFamily: "sans-serif",
                          background: "#353f53",
                          color: "#e5e5e5",
                        }}
                      />
                      <DescriptionButtonsContainer>
                        <InfoPopout
                          infoDescription={
                            "Auto generate draft based on trade tags"
                          }
                        >
                          <If condition={generateDraftLoading}>
                            <Loading size={20} />
                            <Else>
                              <AutoFixHighIcon
                                style={{ marginLeft: 5 }}
                                onClick={() => {
                                  generateDraft(journalEntry.tags);
                                }}
                              />
                            </Else>
                          </If>
                        </InfoPopout>
                        <InfoPopout infoDescription={"Clear description"}>
                          <DeleteOutlineIcon
                            onClick={() => {
                              updateJournalEntry({
                                ...journalEntry,
                                description: "",
                              });
                            }}
                          />
                        </InfoPopout>
                      </DescriptionButtonsContainer>
                    </DescriptionText>
                    <Else>
                      <DescriptionText>
                        {journalEntry.description}
                      </DescriptionText>
                    </Else>
                  </If>
                </DescriptionSection>
              </Section>
            </GlassTile>
          </EntryDetails>
          <Summary>
            <GlassTile
              featureTile
              minHeight={10}
              minWidth={10}
              padding={7}
              noGlow={true}
              noGlassEffect={true}
            >
              <SummaryTitleInfoContainer>
                <Section>
                  <SubsectionHeader>Summary</SubsectionHeader>
                </Section>
                <SummarySection>
                  <SummaryItem>
                    <SummaryItemTitle>Instrument</SummaryItemTitle>
                    <If condition={editing}>
                      <SummaryItemValue>
                        <Input
                          darkMode
                          type="text"
                          onChange={(e) =>
                            updateJournalEntry({
                              ...journalEntry,
                              instrument: e.target.value,
                            })
                          }
                          onSuggestionClick={(suggestion) => {
                            updateJournalEntry({
                              ...journalEntry,
                              instrument: suggestion,
                            });
                          }}
                          value={journalEntry.instrument}
                          style={styles.input}
                          suggestions={[
                            {
                              description: "NQ",
                            },
                            {
                              description: "ES",
                            },
                            {
                              description: "MNQ",
                            },
                            {
                              description: "MES",
                            },
                          ]}
                        />
                      </SummaryItemValue>
                      <Else>
                        <SummaryItemValue>
                          {journalEntry.instrument}
                        </SummaryItemValue>
                      </Else>
                    </If>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Total Contracts</SummaryItemTitle>
                    <SummaryItemValue>
                      {`x${journalEntry.trades.length === 0 ? journalEntry.contracts : journalEntry.contracts * journalEntry.trades.length}`}
                      <SummaryItemValueSubtext>
                        {`[${journalEntry.trades.length} Accounts]`}
                      </SummaryItemValueSubtext>
                    </SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Session</SummaryItemTitle>
                    <SummaryItemValue>{"NYAM"}</SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Total PnL</SummaryItemTitle>
                    <SummaryItemPnL
                      $isPositive={totalPnL >= 0}
                    >{`${formatter.format(totalPnL)}`}</SummaryItemPnL>
                  </SummaryItem>
                </SummarySection>
              </SummaryTitleInfoContainer>
            </GlassTile>
          </Summary>
        </EntryInfoContainer>
      </Container>
    </Page>
  );
};

export default JournalEntry;
