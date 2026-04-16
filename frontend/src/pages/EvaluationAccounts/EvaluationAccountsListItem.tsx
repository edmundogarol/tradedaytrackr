import GlassTile from "@components/GlassTile/GlassTile";
import { formatter } from "@utils/utils";
import React from "react";

import AlertPopout from "@components/Alert/AlertPopout";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import type { EvaluationAccount } from "@interfaces/CustomTypes";
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
  Status,
  StatusContainer,
} from "./EvaluationAccountsStyledComponents";
import styles from "./EvaluationAccountsStyles";
import useGetEvalProgressStatus from "./hooks/useGetEvalProgressStatus";

export interface EvaluationAccountsListItemDetails {
  account: EvaluationAccount;
  openAddTradingDayModal?: (open: boolean) => void;
}

const EvaluationAccountsListItem: React.FunctionComponent<
  EvaluationAccountsListItemDetails
> = ({ account, openAddTradingDayModal }) => {
  const {
    id,
    name,
    accountBalance,
    accountSize,
    image,
    minTradingDays,
    dayValues,
    profitTarget,
    consistencyScore,
  } = account;
  const [alertNoRecord, setAlertNoRecord] = React.useState(false);
  const evalProgressStatus = useGetEvalProgressStatus();
  const progress = ((accountBalance - accountSize) / profitTarget) * 100;
  const navigation = useReactNavigation();
  return (
    <GlassTile positive featureTile minHeight={70} noGlow noShine>
      <AlertPopout
        open={alertNoRecord}
        message="This trade has no journal entry. Please add or link it to a journal entry to view details."
        setPopoutOpen={() => setAlertNoRecord(false)}
        hideDuration={5000}
      />
      <ListItemContainer>
        <AccountImage $image={image || ""} />
        <AccountTitleContainer>
          <AccountTitle
            onClick={() =>
              navigation.navigate(PageEnum.EvaluationAccountDetail, {
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
            Consistency Score: {consistencyScore.toFixed(0)}%
            <InfoPopout
              infoDescription={`Your current consistency score based on the highest day PnL and account profit target`}
            />
          </AccountTradingDaysComplete>
        </AccountTitleContainer>
        <DaysContainer>
          {[...dayValues].reverse().map((dayValue, idx) => (
            <DaysItem key={idx}>
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
              <If condition={!!dayValue.dayNumber}>
                <DaysItemSubtitle>{dayValue.dayNumber}</DaysItemSubtitle>
                <Else>
                  <DaysItemSubtitle>-</DaysItemSubtitle>
                </Else>
              </If>
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
            Profit Target:
            <BufferAmountHighlighted $bufferPercent={progress}>
              {formatter.format(accountBalance - accountSize)}
            </BufferAmountHighlighted>
            /<BufferAmount>{formatter.format(profitTarget)}</BufferAmount>
          </BufferText>
          <BorderLinearProgress
            $bufferPercent={progress}
            variant="determinate"
            value={progress > 100 ? 100 : progress < 0 ? 0 : progress}
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
