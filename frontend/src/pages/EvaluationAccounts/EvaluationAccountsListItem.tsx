import AlertPopout from "@components/Alert/AlertPopout";
import GlassTile from "@components/GlassTile/GlassTile";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import type { EvaluationAccount } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import {
  AccountTitle,
  DaysItemSubtitle,
} from "@pages/FundedAccounts/FundedAccountsStyledComponents";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import {
  BorderLinearProgress,
  HorizontalSection,
  SectionText,
} from "@styles/globalStyledComponents";
import { formatter } from "@utils/utils";
import React from "react";
import {
  AccountImage,
  AccountSubtitle,
  AccountSubtitleHighlighted,
  AccountTitleContainer,
  AccountTradingDaysComplete,
  BufferAmount,
  BufferAmountHighlighted,
  BufferContainer,
  BufferText,
  DaysContainer,
  DaysItem,
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
  archived?: boolean;
}

const EvaluationAccountsListItem: React.FunctionComponent<
  EvaluationAccountsListItemDetails
> = ({ account, openAddTradingDayModal, archived }) => {
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
  const {
    updateDeletingTradingAccountModalOpen,
    updateCurrentTradingAccount,
    updateArchivingAccountModalOpen,
  } = useFundedAccountsDispatch();
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
            $archived={archived}
            onClick={() =>
              archived
                ? null
                : navigation.navigate(PageEnum.EvaluationAccountDetail, {
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
          {archived && dayValues.length === 0 ? (
            <SectionText>No trading days recorded</SectionText>
          ) : null}
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
          <If condition={!archived}>
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
                    updateCurrentTradingAccount(account);
                  }}
                >
                  {"+"}
                </DaysItemValue>
              </GlassTile>
              <DaysItemSubtitle>{"Add"}</DaysItemSubtitle>
            </DaysItem>
          </If>
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
        <If condition={archived}>
          <HorizontalSection>
            <InfoPopout infoDescription="Unarchive this account">
              <InventoryIcon
                style={{
                  color: "white",
                  height: 18,
                  display: "flex",
                  alignSelf: "center",
                }}
                onClick={() => {
                  updateArchivingAccountModalOpen(true);
                  updateCurrentTradingAccount(account);
                }}
              />
            </InfoPopout>
            <InfoPopout infoDescription="Delete this account">
              <DeleteOutlineIcon
                style={{
                  color: "white",
                  height: 20,
                  display: "flex",
                  alignSelf: "center",
                }}
                onClick={() => {
                  updateDeletingTradingAccountModalOpen(true);
                  updateCurrentTradingAccount(account);
                }}
              />
            </InfoPopout>
          </HorizontalSection>
        </If>
      </ListItemContainer>
    </GlassTile>
  );
};

export default EvaluationAccountsListItem;
