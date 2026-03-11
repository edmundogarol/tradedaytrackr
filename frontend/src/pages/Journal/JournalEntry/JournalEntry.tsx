import React, { useMemo } from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import {
  PageContainer as Container,
  Section,
  SectionTitle,
  SubsectionHeader,
} from "@styles/globalStyledComponents";
import GlassTile from "@components/GlassTile/GlassTile";
import { devSrc } from "@utils/utils";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import InfoPopout from "@components/InfoPopout/InfoPopout";
import { Else, If } from "@components/If/If";
import Input from "@components/Input/Input";
import CalendarPicker from "@components/Input/CalendarPicker/CalendarPicker";
import Modal from "@components/Modal/Modal";
import Checkbox from "@mui/material/Checkbox";
import Button from "@components/Button/Button";
import { color } from "@styles/colors";
import { BUTTON_WIDTH } from "@styles/constants";
import { set } from "lodash";
import { mock } from "node:test";
import {
  ButtonContainer,
  DateTimePickerDate,
  DescriptionSection,
  DescriptionText,
  EditDeleteButtons,
  EntryDetails,
  EntryInfoContainer,
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

interface JournalEntryProps {}
const JournalEntry: React.FunctionComponent<JournalEntryProps> = () => {
  const [editing, setEditing] = React.useState(false);
  const [editingDate, setEditingDate] = React.useState(false);
  const [editingAccounts, setEditingAccounts] = React.useState(false);
  const [mockEntry, setMockEntry] = React.useState({
    dateTime: "2011-10-10T14:48:00.000+09:00",
    risk: 300,
    contracts: 3,
    outcome: 310,
    instrument: "NQ",
    description:
      "Price delivered from a higher timeframe bearish leg that had already swept external liquidity earlier in the session. Once the 5m structure shifted bearish, price retraced cleanly into the 50% of the impulse leg which also aligned with a small 1m IFVG. Entry was taken as price tapped the gap and showed immediate rejection. The trade worked quickly as the delivery continued toward the next pool of liquidity. The key element here was respecting the higher timeframe delivery and not anticipating the reversal before the structure shift occurred.",
    image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    trades: [1, 2, 5],
    totalPnL: 930,
  });
  const [selectedAccountTrades, setSelectedAccountTrades] = React.useState<
    number[]
  >([...mockEntry.trades]);

  const availableAccountTradesOnDateMock = [
    {
      id: 1,
      account: "MFFUSFCR71",
      date: moment().add(1, "hour").toISOString(),
      pnl: 310,
    },
    {
      id: 2,
      account: "MFFUSFCR72",
      date: moment().add(2, "hour").toISOString(),
      pnl: 310,
    },
    {
      id: 3,
      account: "MFFUSFCR73",
      date: moment().add(3, "hour").toISOString(),
      pnl: 310,
    },
    {
      id: 4,
      account: "APEXPA21",
      date: moment().add(4, "hour").toISOString(),
      pnl: 310,
    },
    {
      id: 5,
      account: "APEXPA23",
      date: moment().add(5, "hour").toISOString(),
      pnl: 310,
    },
  ];

  const totalPnL = useMemo(() => {
    return mockEntry.trades
      .map((tradeId) => {
        const trade = availableAccountTradesOnDateMock.find(
          (t) => t.id === tradeId,
        );
        return trade ? trade.pnl : 0;
      })
      .reduce((sum, pnl) => sum + pnl, 0);
  }, [mockEntry.trades]);

  return (
    <Page topBarShowMenu={true}>
      <Modal
        open={editingAccounts}
        setOpen={setEditingAccounts}
        title="Select Accounts Trades"
        onClose={() => {
          setEditingAccounts(false);
          setMockEntry({
            ...mockEntry,
            trades: mockEntry.trades,
          });
        }}
      >
        <TradesDetectedContainer>
          {`${availableAccountTradesOnDateMock.length} trades detected for ${moment(mockEntry.dateTime).format("MMM DD")}`}
        </TradesDetectedContainer>
        <TradesDetectedContainer>
          {availableAccountTradesOnDateMock.map((trade, index) => (
            <TradesDetectedTrade key={index}>
              <Checkbox
                sx={{ color: "#a9b1c2" }}
                defaultChecked={mockEntry.trades.includes(trade.id)}
                checked={selectedAccountTrades.includes(trade.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAccountTrades([
                      ...selectedAccountTrades,
                      trade.id,
                    ]);
                  } else {
                    setSelectedAccountTrades(
                      selectedAccountTrades.filter((id) => id !== trade.id),
                    );
                  }
                }}
              />
              <div>{trade.account}</div>
              <TradesDetectedTime>
                {moment(trade.date).format("hh:mm A")}
              </TradesDetectedTime>
              <TradesDetectedPnL>{`$${trade.pnl}`}</TradesDetectedPnL>
            </TradesDetectedTrade>
          ))}
        </TradesDetectedContainer>
        <TradesDetectedPnLTotal>
          {`Total selected PnL: `}
          <TradesDetectedPnLTotalHighlighted>
            $
            {availableAccountTradesOnDateMock
              .filter((trade) => selectedAccountTrades.includes(trade.id))
              .reduce((total, trade) => total + trade.pnl, 0)}
          </TradesDetectedPnLTotalHighlighted>
        </TradesDetectedPnLTotal>
        <TradeAccountsSelectSaveButtonContainer>
          <Button
            onClick={() => {
              setEditingAccounts(false);
              setMockEntry({
                ...mockEntry,
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
                      {moment(mockEntry.dateTime).format("YYYY-MM-DD hh:mm A")}
                    </TradeSubtitleEditing>
                    <DateTimePickerDate />
                    <CalendarPicker
                      onSaveCallback={(pickerOpen) => {
                        setEditingDate(pickerOpen);
                      }}
                      showPicker={editingDate}
                      value={moment(mockEntry.dateTime)}
                      onChange={(val) =>
                        setMockEntry({
                          ...mockEntry,
                          dateTime: val
                            ? val.toISOString()
                            : mockEntry.dateTime,
                        })
                      }
                    />
                    <Else>
                      <TradeSubtitle>
                        {moment(mockEntry.dateTime).format(
                          "YYYY-MM-DD HH:mm A",
                        )}
                      </TradeSubtitle>
                    </Else>
                  </If>
                  <If condition={editing}>
                    <TradeSubtitleEditing
                      onClick={() => setEditingAccounts(true)}
                    >
                      {`${mockEntry.trades.length} Accounts`}
                    </TradeSubtitleEditing>
                    <Else>
                      <TradeSubtitle>{`${mockEntry.trades.length} Accounts`}</TradeSubtitle>
                    </Else>
                  </If>
                  {["IFVG", "Discount", "Long", "Momentum", "50% Tap"].map(
                    (tag, index) => (
                      <TagContainer key={index}>
                        <Tag>#{tag.replace(" ", "")}</Tag>
                      </TagContainer>
                    ),
                  )}
                  <InfoPopout
                    infoDescription={
                      "Tags will be used for Trade Stats* [Upcoming Feature]"
                    }
                  />
                  <EditDeleteButtons>
                    {/* Add edit and delete buttons here */}
                    <ButtonContainer>
                      <If condition={editing}>
                        <TradeSubtitleEditing onClick={() => setEditing(false)}>
                          {"Save"}
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
                  <TradeImage $src={devSrc("trade1.png")} />
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
                            type="number"
                            onChange={(e) =>
                              setMockEntry({
                                ...mockEntry,
                                risk: parseInt(e.target.value),
                              })
                            }
                            defaultValue={mockEntry.risk}
                            style={styles.input}
                          />
                        </SummaryItemValue>
                        <Else>
                          <SummaryItemValue>${mockEntry.risk}</SummaryItemValue>
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
                            type="number"
                            onChange={(e) =>
                              setMockEntry({
                                ...mockEntry,
                                contracts: parseInt(e.target.value),
                              })
                            }
                            defaultValue={mockEntry.contracts}
                            style={styles.input}
                          />
                        </SummaryItemValue>
                        <Else>
                          <SummaryItemValue>
                            x{mockEntry.contracts}
                          </SummaryItemValue>
                        </Else>
                      </If>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemTitle>Outcome</SummaryItemTitle>
                      <If condition={editing}>
                        <SummaryItemValue>
                          <Input
                            type="number"
                            onChange={(e) =>
                              setMockEntry({
                                ...mockEntry,
                                outcome: parseInt(e.target.value),
                              })
                            }
                            defaultValue={mockEntry.outcome}
                            style={styles.input}
                          />
                        </SummaryItemValue>
                        <Else>
                          <SummaryItemValue>
                            ${mockEntry.outcome}
                          </SummaryItemValue>
                        </Else>
                      </If>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemTitle>RR</SummaryItemTitle>
                      <SummaryItemValue>
                        {Number.isFinite(mockEntry.outcome / mockEntry.risk)
                          ? (mockEntry.outcome / mockEntry.risk).toFixed(2)
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
                        onChange={(e) =>
                          setMockEntry({
                            ...mockEntry,
                            description: e.target.value,
                          })
                        }
                        defaultValue={mockEntry.description}
                        style={{
                          height: 100,
                          width: "100%",
                          resize: "none",
                          padding: 5,
                          fontFamily: "sans-serif",
                        }}
                      />
                    </DescriptionText>
                    <Else>
                      <DescriptionText>{mockEntry.description}</DescriptionText>
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
                          type="text"
                          onChange={(e) =>
                            setMockEntry({
                              ...mockEntry,
                              instrument: e.target.value,
                            })
                          }
                          onSuggestionClick={(suggestion) => {
                            setMockEntry({
                              ...mockEntry,
                              instrument: suggestion,
                            });
                          }}
                          value={mockEntry.instrument}
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
                          {mockEntry.instrument}
                        </SummaryItemValue>
                      </Else>
                    </If>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Total Contracts</SummaryItemTitle>
                    <SummaryItemValue>
                      {`x${mockEntry.contracts * mockEntry.trades.length}`}
                      <SummaryItemValueSubtext>
                        {`[${mockEntry.trades.length} Accounts]`}
                      </SummaryItemValueSubtext>
                    </SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Session</SummaryItemTitle>
                    <SummaryItemValue>{"NYAM"}</SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Total PnL</SummaryItemTitle>
                    <SummaryItemPnL>{`$${totalPnL}`}</SummaryItemPnL>
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
