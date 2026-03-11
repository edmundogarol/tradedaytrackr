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
} from "./JournalEntryStyledComponents";
import styles from "./JournalEntryStyles";

const JournalEntry: React.FunctionComponent = () => {
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
                  <TradeSubtitle>
                    {moment().format("MMMM Do YYYY, h:mm A")}
                  </TradeSubtitle>
                  <TradeSubtitle>{"4 Accounts"}</TradeSubtitle>
                  {["IFVG", "Discount", "Long", "Momentum", "50% Tap"].map(
                    (tag, index) => (
                      <TagContainer>
                        <Tag key={index}>#{tag.replace(" ", "")}</Tag>
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
                      <EditIcon
                        style={styles.editIcon}
                        onClick={() => alert("edit")}
                      />
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
                      <SummaryItemValue>${"200"}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemTitle>Contracts</SummaryItemTitle>
                      <SummaryItemValue>{"x3"}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemTitle>Outcome</SummaryItemTitle>
                      <SummaryItemValue>${"210"}</SummaryItemValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemTitle>RR</SummaryItemTitle>
                      <SummaryItemValue>{1.2}</SummaryItemValue>
                    </SummaryItem>
                  </TradeSingleAccountInfo>
                </TradeCapture>
                <Gap level={1} />
                <DescriptionSection>
                  <SubsectionHeader>Description</SubsectionHeader>
                  <DescriptionText>
                    {
                      "Price delivered from a higher timeframe bearish leg that had already swept external liquidity earlier in the session. Once the 5m structure shifted bearish, price retraced cleanly into the 50% of the impulse leg which also aligned with a small 1m IFVG. Entry was taken as price tapped the gap and showed immediate rejection. The trade worked quickly as the delivery continued toward the next pool of liquidity. The key element here was respecting the higher timeframe delivery and not anticipating the reversal before the structure shift occurred."
                    }
                  </DescriptionText>
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
                    <SummaryItemValue>{"NQ"}</SummaryItemValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemTitle>Total Contracts</SummaryItemTitle>
                    <SummaryItemValue>
                      {"x9"}{" "}
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
                    <SummaryItemPnL>{"$1,200"}</SummaryItemPnL>
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
