import React from "react";
import GlassTile from "@components/GlassTile/GlassTile";
import { firmLogoSrc, imageSrc } from "@utils/utils";
import styled from "styled-components";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import InfoPopout from "@components/InfoPopout/InfoPopout";
import {
  BufferContainer,
  BufferAmount,
  BufferAmountHighlighted,
  BufferText,
  DaysContainer,
  DaysItem,
  DaysItemSubtitle,
  DaysItemValue,
  AccountImage,
  PnLContainer,
  PnLValue,
  PnLWithdrawable,
  PnLWithdrawableText,
  AccountSubtitle,
  AccountSubtitleHighlighted,
  AccountTitle,
  AccountTitleContainer,
  ListItemContainer,
  AccountTradingDaysComplete,
} from "./FundedAccountsStyledComponents";
import styles from "./FundedAccountsStyles";

export interface FundedAccountsListItemDetails {
  accountName: string;
  accountSize: number;
  accountBalance: number;
  firm: string;
  firmMinDays?: number;
  firmMinDayPnL?: number;
  currentDayCount: number;
  dayValues: {
    value: number;
    day: string;
  }[];
  noGlow: boolean;
  noShine: boolean;
  minBuffer: number;
  bufferPercent: number;
}

const BorderLinearProgress = styled(LinearProgress)<{ $bufferPercent: number }>(
  ({ $bufferPercent }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#404f5e",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:
        $bufferPercent > 70
          ? "#86c169"
          : $bufferPercent > 40
            ? "#cf943b"
            : "#d56060",
    },
  }),
);

const FundedAccountsListItem: React.FunctionComponent<
  FundedAccountsListItemDetails
> = ({
  accountName,
  accountSize,
  accountBalance,
  firm,
  firmMinDays,
  currentDayCount,
  dayValues,
  noGlow,
  noShine,
  minBuffer,
  bufferPercent,
}) => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <GlassTile
      positive
      featureTile
      minHeight={70}
      noGlow={noGlow}
      noShine={noShine}
    >
      <ListItemContainer>
        <AccountImage src={imageSrc(firmLogoSrc(firm))} />
        <AccountTitleContainer>
          <AccountTitle>{accountName}</AccountTitle>
          <AccountSubtitle>
            Balance:
            <AccountSubtitleHighlighted>
              {formatter.format(accountBalance)}
            </AccountSubtitleHighlighted>
          </AccountSubtitle>
          <AccountTradingDaysComplete>
            {`Eligible Days: ${currentDayCount ?? "N/A"}/${
              firmMinDays ?? "N/A"
            }`}
            <InfoPopout
              infoDescription={`This account requires a minimum of ${firmMinDays} eligible trading days.`}
            />
          </AccountTradingDaysComplete>
        </AccountTitleContainer>
        <DaysContainer>
          {dayValues.map((dayValue, idx) => (
            <DaysItem key={idx}>
              <GlassTile
                positive={dayValue.value > 0}
                featureTile
                minHeight={10}
                minWidth={10}
                padding={7}
              >
                <DaysItemValue $positive={dayValue.value > 0}>
                  {`${dayValue.value > 0 ? "+" : ""}${dayValue.value}`}
                </DaysItemValue>
              </GlassTile>
              <DaysItemSubtitle>{dayValue.day}</DaysItemSubtitle>
            </DaysItem>
          ))}
        </DaysContainer>
        <BufferContainer>
          <BufferText>
            Min Payout Buffer:
            <BufferAmountHighlighted $bufferPercent={bufferPercent}>
              {formatter.format(accountBalance - accountSize)}
            </BufferAmountHighlighted>
            /<BufferAmount>{formatter.format(minBuffer)}</BufferAmount>
            <InfoPopout
              infoDescription={`This account requires a minimum buffer of $${minBuffer} before a payout can be requested.`}
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
