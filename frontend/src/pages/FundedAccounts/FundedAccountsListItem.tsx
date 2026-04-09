import GlassTile from "@components/GlassTile/GlassTile";
import { formatter } from "@utils/utils";
import React from "react";

import AlertPopout from "@components/Alert/AlertPopout";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import type { TradingAccount } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { BorderLinearProgress } from "@styles/globalStyledComponents";
import {
  AccountImage,
  AccountSubtitle,
  AccountSubtitleHighlighted,
  AccountTitle,
  AccountTitleContainer,
  AccountTradingDaysComplete,
  BufferAmount,
  BufferAmountHighlighted,
  BufferContainer,
  BufferText,
  DaysContainer,
  DaysItem,
  DaysItemSubtitle,
  DaysItemValue,
  ListItemContainer,
  PnLContainer,
  PnLValue,
  PnLWithdrawable,
  PnLWithdrawableText,
} from "./FundedAccountsStyledComponents";
import styles from "./FundedAccountsStyles";

export interface FundedAccountsListItemDetails {
  account: TradingAccount;
  openAddTradingDayModal?: (open: boolean) => void;
}

const FundedAccountsListItem: React.FunctionComponent<
  FundedAccountsListItemDetails
> = ({
  account: {
    id,
    name,
    accountBalance,
    bufferPercent,
    accountSize,
    image,
    minTradingDays,
    minBuffer,
    dayValues,
    currentDayCount,
  },
  openAddTradingDayModal,
}) => {
  const navigation = useReactNavigation();
  const [alertNoRecord, setAlertNoRecord] = React.useState(false);

  return (
    <GlassTile positive featureTile minHeight={70} noGlow noShine>
      <AlertPopout
        open={alertNoRecord}
        message="This trade has no journal entry. Please add or link it to a journal entry to view details."
        setPopoutOpen={() => setAlertNoRecord(false)}
        hideDuration={5000}
      />
      <ListItemContainer>
        <AccountImage src={image} />
        <AccountTitleContainer>
          <AccountTitle
            onClick={() =>
              navigation.navigate(PageEnum.FundedAccountDetail, {
                id,
              })
            }
          >
            {name}
          </AccountTitle>
          <AccountSubtitle>
            Balance:
            <AccountSubtitleHighlighted>
              {formatter.format(accountBalance)}
            </AccountSubtitleHighlighted>
          </AccountSubtitle>
          <AccountTradingDaysComplete>
            {`Eligible Days: ${currentDayCount ?? "N/A"}/${
              minTradingDays ?? "N/A"
            }`}
            <InfoPopout
              infoDescription={`This account requires a minimum of ${minTradingDays} eligible trading days.`}
            />
          </AccountTradingDaysComplete>
        </AccountTitleContainer>
        <DaysContainer>
          {dayValues.map((dayValue, idx) => (
            <DaysItem key={idx} onClick={() => setAlertNoRecord(true)}>
              <GlassTile
                positive={dayValue.pnl > 0}
                featureTile
                minHeight={10}
                minWidth={10}
                padding={7}
              >
                <DaysItemValue $positive={dayValue.pnl > 0}>
                  {`${dayValue.pnl > 0 ? "+" : ""}${dayValue.pnl}`}
                </DaysItemValue>
              </GlassTile>
              <DaysItemSubtitle>{dayValue.dayNumber}</DaysItemSubtitle>
            </DaysItem>
          ))}
          <DaysItem>
            <GlassTile
              positive={true}
              featureTile
              minHeight={10}
              minWidth={10}
              padding={7}
            >
              <DaysItemValue
                $positive={true}
                onClick={() => {
                  openAddTradingDayModal && openAddTradingDayModal(true);
                  console.log("open add trading day modal");
                }}
              >
                {"+"}
              </DaysItemValue>
            </GlassTile>
            <DaysItemSubtitle>{"Add"}</DaysItemSubtitle>
          </DaysItem>
        </DaysContainer>
        <BufferContainer>
          <BufferText>
            Min Payout Buffer:
            <BufferAmountHighlighted $bufferPercent={bufferPercent}>
              {formatter.format(accountBalance - accountSize)}
            </BufferAmountHighlighted>
            /<BufferAmount>{formatter.format(Number(minBuffer))}</BufferAmount>
            <InfoPopout
              infoDescription={`This account requires a minimum buffer of $${Number(minBuffer).toFixed(0)} before a payout can be requested.`}
            />
          </BufferText>
          <BorderLinearProgress
            $bufferPercent={bufferPercent}
            variant="determinate"
            value={bufferPercent}
            style={styles.progressBar}
          />
        </BufferContainer>
        <PnLContainer>
          <PnLValue $bufferPercent={bufferPercent}>
            {formatter.format(accountBalance - accountSize)}
          </PnLValue>
          <PnLWithdrawable
            $positive={accountBalance - accountSize - minBuffer > 0}
          >
            <PnLWithdrawableText>Withdrawable:</PnLWithdrawableText>
            {accountBalance - accountSize - minBuffer < 0
              ? formatter.format(0)
              : formatter.format(accountBalance - accountSize - minBuffer)}
          </PnLWithdrawable>
        </PnLContainer>
      </ListItemContainer>
    </GlassTile>
  );
};

export default FundedAccountsListItem;
