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

import {
  EditDeleteButtons,
  EntryDetails,
  EntryInfoContainer,
  Information,
  Tag,
  TagContainer,
  TradeCapture,
  TradeImage,
  TradeInfo,
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
                  <EditDeleteButtons>
                    {/* Add edit and delete buttons here */}
                    <EditIcon
                      style={styles.editIcon}
                      onClick={() => alert("edit")}
                    />
                    <DeleteOutlineIcon
                      style={styles.editIcon}
                      onClick={() => alert("Delete Trade")}
                    />
                  </EditDeleteButtons>
                </TradeInfo>
                <TradeCapture>
                  <TradeImage $src={devSrc("trade1.png")} />
                </TradeCapture>
              </Section>
            </GlassTile>
          </EntryDetails>
          <Information>
            <GlassTile
              featureTile
              minHeight={10}
              minWidth={10}
              padding={7}
              noGlow={true}
            >
              <Section>
                <SubsectionHeader>Information</SubsectionHeader>
              </Section>
            </GlassTile>
          </Information>
        </EntryInfoContainer>
      </Container>
    </Page>
  );
};

export default JournalEntry;
