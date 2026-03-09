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
        "Added $500 to account after good week of trading with 3% drawdown and 10% gain. Added $4000 to account after good week of trading with 1% drawdown and 20% gain. ",
      accountsCount: 3,
      image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    {
      id: 2,
      dateTime: "2011-10-11T14:48:00.000+09:00",
      value: -2000,
      description:
        "Removed $200 from account after bad week of trading with 10% drawdown and 5% loss. Removed $1800 from account after bad week of trading with 8% drawdown and 4% loss",
      accountsCount: 2,
      image: "https://cdn-icons-png.flaticon.com/512/190/190406.png",
    },
    {
      id: 3,
      dateTime: "2011-10-12T14:48:00.000+09:00",
      value: 3000,
      description:
        "Added $300 to account after good week of trading with 2% drawdown and 8% gain",
      accountsCount: 4,
      image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    {
      id: 4,
      dateTime: "2011-10-13T14:48:00.000+09:00",
      value: -1500,
      description:
        "Removed $150 from account after bad week of trading with 8% drawdown and 3% loss. Removed $1350 from account after bad week of trading with 5% drawdown and 2% loss",
      accountsCount: 1,
      image: "https://cdn-icons-png.flaticon.com/512/190/190406.png",
    },
    {
      id: 5,
      dateTime: "2011-10-14T14:48:00.000+09:00",
      value: 2500,
      description:
        "Added $250 to account after good week of trading with 1% drawdown and 12% gain",
      accountsCount: 5,
      image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    {
      id: 6,
      dateTime: "2011-10-15T14:48:00.000+09:00",
      value: -1000,
      description:
        "Removed $100 from account after bad week of trading with 5% drawdown and 2% loss",
      accountsCount: 2,
      image: "https://cdn-icons-png.flaticon.com/512/190/190406.png",
    },
    {
      id: 7,
      dateTime: "2011-10-16T14:48:00.000+09:00",
      value: 4000,
      description:
        "Added $400 to account after good week of trading with 3% drawdown and 15% gain. Added $3600 to account after good week of trading with 1% drawdown and 25% gain",
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
