import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import {
  PageContainer as Container,
  SectionTitle,
} from "@styles/globalStyledComponents";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import EditIcon from "@mui/icons-material/Edit";

import GlassTile from "@components/GlassTile/GlassTile";
import {
  DateContainer,
  DayValue,
  EditContainer,
  PnL,
  PreviewDayValueContainer,
  Time,
  TradeDay,
  TradePreview,
  TradePreviewContainer,
} from "@pages/FundedAccounts/FundedAccountDetail/FundedAccountDetailStyledComponents";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { color } from "@styles/colors";
import moment from "moment";
import { formatter } from "@utils/utils";
import {
  Description,
  Entry,
  JournalEntries,
  TileTradeCount,
  TileTradeCountContainer,
} from "./JournalStyledComponents";
import styles from "./JournalStyles";

const Journal: React.FunctionComponent = () => {
  const journalEntries = [
    {
      id: 1,
      dateTime: "2011-10-10T14:48:00.000+09:00",
      value: 4500,
      description:
        "Price delivered cleanly from the higher timeframe bias after sweeping liquidity and displacing strongly. I waited for the retrace into the 50% where an IFVG formed and executed the entry according to the model.",
      accountsCount: 3,
      image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    {
      id: 2,
      dateTime: "2011-10-11T14:48:00.000+09:00",
      value: -2000,
      description:
        "Higher timeframe delivery was clear but the retrace into the 50% was messy and the IFVG lacked clean displacement, which made the setup lower quality.",
      accountsCount: 2,
      image: "https://cdn-icons-png.flaticon.com/512/190/190406.png",
    },
    {
      id: 3,
      dateTime: "2011-10-12T14:48:00.000+09:00",
      value: 3000,
      description:
        "Clean liquidity sweep followed by displacement, with price retracing directly into the 50% IFVG for entry.",
      accountsCount: 4,
      image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    {
      id: 4,
      dateTime: "2011-10-13T14:48:00.000+09:00",
      value: -1500,
      description:
        "Higher timeframe bias aligned perfectly and the retracement into the 50% IFVG provided a straightforward mechanical entry.",
      accountsCount: 1,
      image: "https://cdn-icons-png.flaticon.com/512/190/190406.png",
    },
    {
      id: 5,
      dateTime: "2011-10-14T14:48:00.000+09:00",
      value: 2500,
      description:
        "The setup technically met the rules with a 50% retrace into an IFVG, but the overall delivery from the higher timeframe felt weak.",
      accountsCount: 5,
      image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    {
      id: 6,
      dateTime: "2011-10-15T14:48:00.000+09:00",
      value: -1000,
      description:
        "Clear displacement created an IFVG and price retraced into the 50% before continuing the higher timeframe move.",
      accountsCount: 2,
      image: "https://cdn-icons-png.flaticon.com/512/190/190406.png",
    },
    {
      id: 7,
      dateTime: "2011-10-16T14:48:00.000+09:00",
      value: 4000,
      description:
        "Price delivered strongly from the higher timeframe narrative, sweeping liquidity before retracing into the 50% inefficiency.",
      accountsCount: 6,
      image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  ];

  return (
    <Page topBarShowMenu={true}>
      <Container>
        <SectionTitle>Journal</SectionTitle>
        <Gap level={1} />
        <JournalEntries>
          {/* <Entry></Entry> */}
          {journalEntries.reverse().map((entry, index) => (
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
                    <TileTradeCount className="trade-count">{`x${entry.accountsCount} acc`}</TileTradeCount>
                  </InfoPopout>
                </TileTradeCountContainer>
              }
            >
              <TradeDay>
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
                <PnL $positive={entry.value >= 0}>
                  {formatter.format(entry.value)}
                </PnL>
                <InfoPopout infoDescription="Edit Details">
                  <EditContainer>
                    <EditIcon
                      style={styles.editIcon}
                      onClick={() => alert("Alert")}
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
