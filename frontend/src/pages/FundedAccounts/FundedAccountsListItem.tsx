import GlassTile from "@components/GlassTile/GlassTile";
import { decimalStringToInt, formatter } from "@utils/utils";
import React, { useState } from "react";

import AlertPopout from "@components/Alert/AlertPopout";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import type { TradingAccount } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import {
  BorderLinearProgress,
  HorizontalSection,
  SectionText,
} from "@styles/globalStyledComponents";
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
import useFundedAccountsDispatch from "./hooks/useFundedAccountsDispatch";

export interface FundedAccountsListItemDetails {
  account: TradingAccount;
  openAddTradingDayModal?: (open: boolean) => void;
  archived?: boolean;
}

const FundedAccountsListItem: React.FunctionComponent<
  FundedAccountsListItemDetails
> = ({ account, openAddTradingDayModal, archived }) => {
  const {
    id,
    name,
    accountBalance,
    bufferPercent,
    accountSize,
    image,
    minTradingDays,
    minBuffer,
    minPayoutRequest,
    maxPayoutRequest,
    dayValues,
    currentDayCount,
    withdrawableAmount,
    postPayoutBuffer,
    consistencyScore,
  } = account;
  const navigation = useReactNavigation();
  const [alertNoRecord, setAlertNoRecord] = useState(false);

  const {
    updateCurrentTradingAccount,
    updateArchivingAccountModalOpen,
    updateDeletingTradingAccountModalOpen,
  } = useFundedAccountsDispatch();
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
                : navigation.navigate(PageEnum.FundedAccountDetail, {
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
          <AccountTradingDaysComplete
            $eligible={currentDayCount >= Number(minTradingDays)}
          >
            <AccountTradingDaysComplete $eligible={false}>
              {`Eligible Days:`}
            </AccountTradingDaysComplete>
            {`${currentDayCount ?? "N/A"}/${minTradingDays ?? "N/A"}`}
            <InfoPopout
              infoDescription={`This account requires a minimum of ${minTradingDays} eligible trading days before payout.`}
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
                <DaysItemValue $positive={dayValue.pnl > 0} $clickable={false}>
                  {`${dayValue.pnl > 0 ? "+" : ""}${decimalStringToInt(dayValue.pnl)}`}
                </DaysItemValue>
              </GlassTile>
              <If condition={!!dayValue.dayNumber}>
                <DaysItemSubtitle>{dayValue.dayNumber}</DaysItemSubtitle>
                <Else>
                  <DaysItemSubtitle>-</DaysItemSubtitle>
                </Else>
              </If>
              <If condition={dayValue.hasPayout}>
                <LocalParkingIcon className="payout-icon" />
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
          <HorizontalSection style={{ gap: 0 }}>
            <PnLValue
              $withdrawable={
                accountBalance - accountSize > minBuffer &&
                withdrawableAmount >= minPayoutRequest &&
                currentDayCount >= Number(minTradingDays)
              }
            >
              {withdrawableAmount > 0
                ? formatter.format(withdrawableAmount)
                : formatter.format(0)}
            </PnLValue>
            <If condition={withdrawableAmount <= 0}>
              <InfoPopout
                infoDescription={`This account requires a minimum payout request of $${Number(minPayoutRequest).toFixed(0)} - above the buffer`}
              />
            </If>
          </HorizontalSection>
          <PnLWithdrawable $positive={withdrawableAmount > 0}>
            <PnLWithdrawableText>Consistency Score:</PnLWithdrawableText>%
            {Number(consistencyScore).toFixed(0)}
          </PnLWithdrawable>
        </PnLContainer>
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

export default FundedAccountsListItem;
