import React from "react";
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
import {
  ButtonContainer,
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
  TradeCapture,
  TradeImage,
  TradeInfo,
  TradeSingleAccountInfo,
  TradeSubtitle,
  TradeSubtitleEditing,
} from "./JournalEntryStyledComponents";
import styles from "./JournalEntryStyles";

interface JournalEntryProps {}
const JournalEntry: React.FunctionComponent<JournalEntryProps> = () => {
  const [editing, setEditing] = React.useState(false);
  const [mockEntry, setMockEntry] = React.useState({
    dateTime: "2011-10-10T14:48:00.000+09:00",
    risk: 300,
    contracts: 3,
    outcome: 310,
    instrument: "NQ",
    description:
      "Price delivered from a higher timeframe bearish leg that had already swept external liquidity earlier in the session. Once the 5m structure shifted bearish, price retraced cleanly into the 50% of the impulse leg which also aligned with a small 1m IFVG. Entry was taken as price tapped the gap and showed immediate rejection. The trade worked quickly as the delivery continued toward the next pool of liquidity. The key element here was respecting the higher timeframe delivery and not anticipating the reversal before the structure shift occurred.",
    image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    trades: [
      {
        account: "Account 1",
        pnl: 310,
      },
      {
        account: "Account 2",
        pnl: 310,
      },
      {
        account: "Account 3",
        pnl: 310,
      },
    ],
    totalPnL: 930,
  });

  return (
    <Page topBarShowMenu={true}>
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
                    <TradeSubtitleEditing>
                      {mockEntry.dateTime}
                    </TradeSubtitleEditing>
                    <Else>
                      <TradeSubtitle>
                        {moment(mockEntry.dateTime).format(
                          "YYYY-MM-DD HH:mm A",
                        )}
                      </TradeSubtitle>
                    </Else>
                  </If>
                  <If condition={editing}>
                    <TradeSubtitleEditing>
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
                      {`x${mockEntry.contracts * 3}`}
                      <SummaryItemValueSubtext>
                        {"[3 Accounts]"}
                      </SummaryItemValueSubtext>
                    </SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Session</SummaryItemTitle>
                    <SummaryItemValue>{"NYAM"}</SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Total PnL</SummaryItemTitle>
                    <SummaryItemPnL>{`$${mockEntry.totalPnL}`}</SummaryItemPnL>
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
