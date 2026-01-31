import React from "react";
import GlassTile from "@components/GlassTile/GlassTile";
import { firmLogoSrc, imageSrc } from "@utils/utils";
import styled from "styled-components";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import {
  FundedAccountListItemAccount,
  FundedAccountListItemAccountBuffer,
  FundedAccountListItemAccountBufferAmount,
  FundedAccountListItemAccountBufferAmountHighlighted,
  FundedAccountListItemAccountBufferText,
  FundedAccountListItemAccountDaysContainer,
  FundedAccountListItemAccountDaysItem,
  FundedAccountListItemAccountDaysItemSubtitle,
  FundedAccountListItemAccountDaysItemValue,
  FundedAccountListItemAccountImage,
  FundedAccountListItemAccountPnL,
  FundedAccountListItemAccountPnLValue,
  FundedAccountListItemAccountPnLWithdrawable,
  FundedAccountListItemAccountPnLWithdrawableText,
  FundedAccountListItemAccountSubtitle,
  FundedAccountListItemAccountSubtitleHighlighted,
  FundedAccountListItemAccountTitle,
  FundedAccountListItemAccountTitleContainer,
  FundedAccountListItemContainer,
} from "./FundedAccountsStyledComponents";
import styles from "./FundedAccountsStyles";

export interface FundedAccountsListItemDetails {
  accountName: string;
  accountSize: number;
  accountBalance: number;
  firm: string;
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
  })
);

const FundedAccountsListItem: React.FunctionComponent<
  FundedAccountsListItemDetails
> = ({
  accountName,
  accountSize,
  accountBalance,
  firm,
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

  const bufferFormatter = Intl.NumberFormat("en-US", {
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
      <FundedAccountListItemContainer>
        <FundedAccountListItemAccount>
          <FundedAccountListItemAccountImage
            src={imageSrc(firmLogoSrc(firm))}
          />
          <FundedAccountListItemAccountTitleContainer>
            <FundedAccountListItemAccountTitle>
              {accountName}
            </FundedAccountListItemAccountTitle>
            <FundedAccountListItemAccountSubtitle>
              Balance:
              <FundedAccountListItemAccountSubtitleHighlighted>
                {formatter.format(accountBalance)}
              </FundedAccountListItemAccountSubtitleHighlighted>
            </FundedAccountListItemAccountSubtitle>
          </FundedAccountListItemAccountTitleContainer>
          <FundedAccountListItemAccountDaysContainer>
            {dayValues.map((dayValue) => (
              <FundedAccountListItemAccountDaysItem>
                <GlassTile
                  positive={dayValue.value > 0}
                  featureTile
                  minHeight={10}
                  minWidth={10}
                  padding={7}
                >
                  <FundedAccountListItemAccountDaysItemValue
                    $positive={dayValue.value > 0}
                  >
                    {`${dayValue.value > 0 ? "+" : ""}${dayValue.value}`}
                  </FundedAccountListItemAccountDaysItemValue>
                </GlassTile>
                <FundedAccountListItemAccountDaysItemSubtitle>
                  {dayValue.day}
                </FundedAccountListItemAccountDaysItemSubtitle>
              </FundedAccountListItemAccountDaysItem>
            ))}
          </FundedAccountListItemAccountDaysContainer>
          <FundedAccountListItemAccountBuffer>
            <FundedAccountListItemAccountBufferText>
              Min Payout Buffer:
              <FundedAccountListItemAccountBufferAmountHighlighted
                $bufferPercent={bufferPercent}
              >
                {formatter.format(accountBalance - accountSize)}
              </FundedAccountListItemAccountBufferAmountHighlighted>
              /
              <FundedAccountListItemAccountBufferAmount>
                {formatter.format(minBuffer)}
              </FundedAccountListItemAccountBufferAmount>
            </FundedAccountListItemAccountBufferText>
            <BorderLinearProgress
              $bufferPercent={bufferPercent}
              variant="determinate"
              value={bufferPercent}
              style={styles.progressBar}
            />
          </FundedAccountListItemAccountBuffer>
          <FundedAccountListItemAccountPnL>
            <FundedAccountListItemAccountPnLValue
              $bufferPercent={bufferPercent}
            >
              {formatter.format(accountBalance - accountSize)}
            </FundedAccountListItemAccountPnLValue>
            <FundedAccountListItemAccountPnLWithdrawable
              $positive={accountBalance - accountSize - minBuffer > 0}
            >
              <FundedAccountListItemAccountPnLWithdrawableText>
                Withdrawable:
              </FundedAccountListItemAccountPnLWithdrawableText>
              {accountBalance - accountSize - minBuffer < 0
                ? formatter.format(0)
                : formatter.format(accountBalance - accountSize - minBuffer)}
            </FundedAccountListItemAccountPnLWithdrawable>
          </FundedAccountListItemAccountPnL>
        </FundedAccountListItemAccount>
      </FundedAccountListItemContainer>
    </GlassTile>
  );
};

export default FundedAccountsListItem;
