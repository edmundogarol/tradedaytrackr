import AlertPopout from "@components/Alert/AlertPopout";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import CalendarPicker from "@components/Input/CalendarPicker/CalendarPicker";
import Input from "@components/Input/Input";
import Loading from "@components/Loading/Loading";
import ModalWrapper from "@components/Modal/Modal";
import Page from "@components/Page/Page";
import type { Tag } from "@interfaces/CustomTypes";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import PhotoIcon from "@mui/icons-material/Photo";
import {
  PageContainer as Container,
  Section,
  SectionTitle,
  SubsectionHeader,
} from "@styles/globalStyledComponents";
import {
  formatter,
  getICTMacroLabel,
  isNotEmptyString,
  m,
  sanitizeTag,
} from "@utils/utils";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import DeleteJournalEntry from "../DeleteJournalEntry/JournalEntry";
import useCreateJournalEntryHandler from "../hooks/useCreateJournalEntryHandler";
import useGenerateDraftAIHandler from "../hooks/useGenerateDraftAIHandler";
import useGenerateTagsAIHandler from "../hooks/useGenerateTagsAIHandler";
import useGetJournalEntryHandler from "../hooks/useGetJournalEntryHandler";
import useGetTradesByDateHandler from "../hooks/useGetTradesByDateHandler";
import useJournalDispatch from "../hooks/useJournalDispatch";
import useJournalState from "../hooks/useJournalState";
import useUpdateJournalEntryHandler from "../hooks/useUpdateJournalEntryHandler";
import type { JournalEntry as JournalEntryType } from "../JournalInterfaces";
import { initialState } from "../JournalState";
import { availableAccountTradesOnDateMock } from "../mocks/tradesOnDate";
import SelectDateTrades from "../SelectDateTrades/SelectDateTrades";
import {
  ButtonContainer,
  CloseIconStyled,
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
  TagComponent,
  TagContainer,
  TagInputContainer,
  TagInputWithAIButtonContainer,
  TagsContainer,
  TradeCapture,
  TradeImage,
  TradeInfo,
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
  const {
    journalEntry,
    selectedDateTrades,
    journalErrors,
    journalEntries,
    editingJournalEntry: editing,
  } = useJournalState();
  const {
    updateJournalEntry,
    updateDetectedTrades,
    updateJournalErrors,
    updateDeleteJournalEntryModalOpen,
    updateEditingJournalEntry,
  } = useJournalDispatch();
  let [searchParams] = useSearchParams();
  const journalEntryId = searchParams.get("id");
  const [editingDate, setEditingDate] = useState(false);
  const [editingAccounts, setEditingAccounts] = useState(false);
  const [openJournalEntryImageModal, setOpenJournalEntryImageModal] =
    useState(false);

  const [currentTagInput, setCurrentTagInput] = useState("");
  const { getJournalEntry } = useGetJournalEntryHandler();
  const { getTradesByDate } = useGetTradesByDateHandler();
  const saveDisabled =
    journalEntry.contracts <= 0 ||
    journalEntry.risk <= 0 ||
    journalEntry.instrument === "";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [journalEntryImage, setJournalEntryImage] = useState<File | null>(null);

  useEffect(() => {
    if (journalEntry.id === 0 && searchParams.get("id") !== "new") {
      getJournalEntry(parseInt(searchParams.get("id") || "0"));
    }
  }, [searchParams, journalEntry]);

  useEffect(() => {
    const currentEntry = journalEntries.find(
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
      getTradesByDate(m(journalEntry.dateTime).format("YYYY-MM-DD"));
    }
  }, [editingAccounts]);

  useEffect(() => {
    if (editing && journalEntryId !== "new") {
      updateEditingJournalEntry(false);
    }
  }, [journalEntryId]);

  useEffect(() => {
    if (!editing) {
      setJournalEntryImage(null);
    }
  }, [journalEntry.imageUrl]);

  const detectedTradesPnL = useMemo(() => {
    return selectedDateTrades
      .filter((trade) => journalEntry?.tradeIds?.includes(trade.id))
      .reduce((total, trade) => total + Number(trade.pnl), 0);
  }, [selectedDateTrades, journalEntry?.tradeIds]);

  const { createJournalEntry, loading: creatingJournalEntry } =
    useCreateJournalEntryHandler();

  const {
    updateJournalEntry: updateJournalEntryApiCall,
    loading: updatingJournalEntry,
  } = useUpdateJournalEntryHandler();

  const imageSrc = useMemo(() => {
    if (journalEntryImage instanceof File) {
      return URL.createObjectURL(journalEntryImage);
    }
    if (journalEntry.imageUrl) {
      return journalEntry.imageUrl;
    }
    return "";
  }, [journalEntryImage, journalEntry.imageUrl]);

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        setPopoutOpen={() => updateJournalErrors({ detail: "" })}
        hideDuration={4000}
        open={isNotEmptyString(journalErrors.detail)}
        message={journalErrors?.detail}
      />
      <ModalWrapper
        backdropClose={() => setOpenJournalEntryImageModal(false)}
        title="Trade Preview"
        open={openJournalEntryImageModal}
        setOpen={setOpenJournalEntryImageModal}
      >
        <img
          src={imageSrc}
          style={{
            width: "100%",
            maxHeight: 400,
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      </ModalWrapper>
      <DeleteJournalEntry />
      <SelectDateTrades
        detectedTradesPnL={detectedTradesPnL}
        editingAccounts={editingAccounts}
        setEditingAccounts={setEditingAccounts}
      />
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
                      {m(journalEntry.dateTime).format("YYYY-MM-DD hh:mm A")}
                    </TradeSubtitleEditing>
                    <CalendarPicker
                      onSaveCallback={() => {
                        setEditingDate(false);
                      }}
                      showPicker={editingDate}
                      value={m(journalEntry.dateTime)}
                      onChange={(val) =>
                        updateJournalEntry({
                          ...journalEntry,
                          dateTime: val
                            ? val.toISOString()
                            : journalEntry.dateTime,
                        })
                      }
                    />
                    <Else>
                      <TradeSubtitle>
                        {m(journalEntry.dateTime).format("YYYY-MM-DD hh:mm A")}
                      </TradeSubtitle>
                    </Else>
                  </If>
                  <If condition={editing}>
                    <TradeSubtitleEditing
                      onClick={() => setEditingAccounts(true)}
                    >
                      {`${journalEntry.tradeIds.length} Accounts`}
                    </TradeSubtitleEditing>
                    <Else>
                      <TradeSubtitle>{`${journalEntry.tradeIds.length} Accounts`}</TradeSubtitle>
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
                                  tag.name.toLowerCase() === val.toLowerCase(),
                              )
                            ) {
                              setCurrentTagInput("");
                              return;
                            }
                            updateJournalEntry({
                              ...journalEntry,
                              tags: [
                                ...journalEntry.tags,
                                { name: val } as Tag,
                              ],
                            });
                            setCurrentTagInput("");
                          }}
                          onSuggestionClick={(suggestion) => {
                            updateJournalEntry({
                              ...journalEntry,
                              tags: [
                                ...journalEntry.tags,
                                { name: suggestion } as Tag,
                              ],
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
                                  tag.name.toLowerCase() !==
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
                          <TagComponent $editing={editing}>
                            #{sanitizeTag(tag.name)}
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
                                        t.name.toLowerCase() !==
                                        tag.name.toLowerCase(),
                                    ),
                                  });
                                }}
                              />
                            </If>
                          </TagComponent>
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
                          onClick={() => {
                            if (journalEntryId === "new") {
                              createJournalEntry(
                                journalEntry,
                                journalEntryImage,
                              );
                            } else {
                              updateJournalEntryApiCall(
                                journalEntry,
                                journalEntryImage,
                              );
                            }
                          }}
                        >
                          {creatingJournalEntry || updatingJournalEntry ? (
                            <Loading size={10} />
                          ) : (
                            "Save"
                          )}
                        </TradeSubtitleEditing>
                        <TradeSubtitleEditing
                          onClick={() => {
                            updateJournalEntry(originalJournalEntry);
                            setJournalEntryImage(null);
                            updateEditingJournalEntry(false);
                          }}
                        >
                          {"Cancel"}
                        </TradeSubtitleEditing>
                        <TradeSubtitleEditing
                          onClick={() => {
                            updateJournalEntry({
                              dateTime: moment().format(),
                              risk: 250,
                              contracts: 1,
                              outcome: 300,
                              instrument: "NQ",
                              description: "Here's a description of the trade.",
                              tags: [
                                { name: "Momentum" },
                                { name: "Long" },
                              ] as Tag[],
                            } as JournalEntryType);
                          }}
                        >
                          {"MockFill"}
                        </TradeSubtitleEditing>
                        <Else>
                          <EditIcon
                            style={styles.editIcon}
                            onClick={() => updateEditingJournalEntry(true)}
                          />
                        </Else>
                      </If>
                    </ButtonContainer>
                    <ButtonContainer>
                      <DeleteOutlineIcon
                        style={styles.editIcon}
                        onClick={() => {
                          updateDeleteJournalEntryModalOpen(true);
                        }}
                      />
                    </ButtonContainer>
                  </EditDeleteButtons>
                </TradeInfo>
                <FormError error={journalErrors?.trade_ids} />
                <FormError error={journalErrors?.risk} />
                <TradeCapture>
                  <div>
                    <TradeImage
                      $src={imageSrc}
                      $editing={editing}
                      onClick={() => {
                        if (editing) {
                          fileInputRef?.current?.click();
                        } else if (imageSrc) {
                          setOpenJournalEntryImageModal(true);
                        }
                      }}
                    >
                      {/* ONLY show when NO image */}
                      {!imageSrc && !editing && (
                        <IconContainer>
                          <PhotoIcon
                            style={{
                              color: "#aaa",
                              height: 50,
                              width: 50,
                            }}
                          />
                        </IconContainer>
                      )}

                      {/* overlay when editing */}
                      {editing && (
                        <IconContainer>
                          <AddPhotoAlternateIcon
                            style={{
                              color: "white",
                              height: 50,
                              width: 50,
                            }}
                          />
                        </IconContainer>
                      )}
                    </TradeImage>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={(e) => {
                        const selected = e.target.files?.[0];
                        if (selected) {
                          setJournalEntryImage(selected);
                        }
                      }}
                    />
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
                            value={journalEntry.risk}
                            style={styles.input}
                            suggestions={[
                              {
                                description: "250",
                              },
                              {
                                description: "300",
                              },
                            ]}
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
                            value={journalEntry.contracts}
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
                            value={journalEntry.outcome}
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
                                  generateDraft(
                                    journalEntry.tags.map((tag) => tag.name),
                                  );
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
                      {`x${journalEntry.tradeIds.length === 0 ? journalEntry.contracts : journalEntry.contracts * journalEntry.tradeIds.length}`}
                      <SummaryItemValueSubtext>
                        {`[${journalEntry.tradeIds.length} Accounts]`}
                      </SummaryItemValueSubtext>
                    </SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Session</SummaryItemTitle>
                    <SummaryItemValue>
                      {getICTMacroLabel(journalEntry.dateTime)}
                    </SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Total PnL</SummaryItemTitle>
                    <SummaryItemPnL
                      $isPositive={journalEntry.totalPnl >= 0}
                    >{`${formatter.format(editing ? detectedTradesPnL : journalEntry.totalPnl)}`}</SummaryItemPnL>
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
