import React from "react";
import GlassTile from "@components/GlassTile/GlassTile";
import { firmLogoSrc, imageSrc } from "@utils/utils";
import styled from "styled-components";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import InfoPopout from "@components/InfoPopout/InfoPopout";
import { color } from "@styles/colors";
import AlertPopout from "@components/Alert/AlertPopout";
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
  StatusContainer,
  Status,
  AccountSubtitle,
  AccountSubtitleHighlighted,
  AccountTitle,
  AccountTitleContainer,
  ListItemContainer,
  AccountTradingDaysComplete,
} from "./EvaluationAccountsStyledComponents";
import styles from "./EvaluationAccountsStyles";
import useGetEvalProgressStatus from "./hooks/useGetEvalProgressStatus";

export interface EvaluationAccountsListItemDetails {
  accountName: string;
  accountSize: number;
  accountBalance: number;
  profitTarget: number;
  firm: string;
  firmMinDays?: number;
  currentDayCount: number;
  currentConsistencyScore: number;
  dayValues: {
    value: number;
    day: string;
  }[];
  noGlow: boolean;
  noShine: boolean;
  minBuffer: number;
  tileGlowPositive?: boolean | undefined;
  openAddTradingDayModal: (open: boolean) => void;
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
      backgroundColor: $bufferPercent > 60 ? color("SystemBlue5") : "#cf943b",
    },
  }),
);

const EvaluationAccountsListItem: React.FunctionComponent<
  EvaluationAccountsListItemDetails
> = ({
  accountName,
  accountSize,
  accountBalance,
  profitTarget,
  firm,
  firmMinDays,
  currentDayCount,
  currentConsistencyScore,
  dayValues,
  noGlow,
  noShine,
  minBuffer,
  tileGlowPositive,
  openAddTradingDayModal,
}) => {
  const [alertNoRecord, setAlertNoRecord] = React.useState(false);
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const evalProgressStatus = useGetEvalProgressStatus();
  const progress = ((accountBalance - accountSize) / profitTarget) * 100;

  return (
    <GlassTile
      positive={tileGlowPositive}
      featureTile
      minHeight={70}
      noGlow={noGlow}
      noShine={noShine}
    >
      <AlertPopout
        open={alertNoRecord}
        message="This trade has no journal entry. Please add or link it to a journal entry to view details."
        setPopoutOpen={setAlertNoRecord}
        hideDuration={5000}
      />
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
            Consistency Score: {currentConsistencyScore}%
            <InfoPopout
              infoDescription={`Your current consistency score based on the highest day PnL and account profit target`}
            />
          </AccountTradingDaysComplete>
        </AccountTitleContainer>
        <DaysContainer>
          {dayValues.map((dayValue, idx) => (
            <DaysItem key={idx} onClick={() => setAlertNoRecord(true)}>
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
                  openAddTradingDayModal(true);
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
            Profit Target:
            <BufferAmountHighlighted $bufferPercent={progress}>
              {formatter.format(accountBalance - accountSize)}
            </BufferAmountHighlighted>
            /<BufferAmount>{formatter.format(profitTarget)}</BufferAmount>
          </BufferText>
          <BorderLinearProgress
            $bufferPercent={progress}
            variant="determinate"
            value={progress}
            style={styles.progressBar}
          />
        </BufferContainer>
        <StatusContainer>
          <Status $bufferPercent={progress}>
            {evalProgressStatus(
              ((accountBalance - accountSize) / profitTarget) * 100,
            )}
          </Status>
        </StatusContainer>
      </ListItemContainer>
    </GlassTile>
  );
};

export default EvaluationAccountsListItem;
