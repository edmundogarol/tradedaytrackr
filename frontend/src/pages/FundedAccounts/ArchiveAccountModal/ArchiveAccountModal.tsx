import GlassTile from "@components/GlassTile/GlassTile";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import ModalWrapper from "@components/Modal/Modal";
import { AccountTradingDaysComplete } from "@pages/EvaluationAccounts/EvaluationAccountsStyledComponents";
import { formatter } from "@utils/utils";
import React from "react";
import {
  AccountImage,
  AccountSubtitle,
  AccountSubtitleHighlighted,
  AccountTitle,
  AccountTitleContainer,
  DaysContainer,
  DaysItem,
  DaysItemSubtitle,
  DaysItemValue,
  ListItemContainer,
} from "../FundedAccountsStyledComponents";
import useArchiveTradingAccountHandler from "../hooks/useArchiveTradingAccountHandler";
import useFundedAccountsDispatch from "../hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "../hooks/useFundedAccountsState";
interface ArchiveAccountModalProps {
  unarchive?: boolean;
}

const ArchiveAccountModal: React.FunctionComponent<
  ArchiveAccountModalProps
> = ({ unarchive }) => {
  const {
    currentTradingAccount,
    currentTradingAccountErrors,
    archivingAccountModalOpen,
  } = useFundedAccountsState();
  const { updateArchivingAccountModalOpen } = useFundedAccountsDispatch();
  const { archiveTradingAccount, loading: archiveLoading } =
    useArchiveTradingAccountHandler();

  return (
    <ModalWrapper
      open={archivingAccountModalOpen}
      onClose={() => updateArchivingAccountModalOpen(false)}
      title={
        unarchive ? "Unarchive Trading Account" : "Archive Trading Account"
      }
      setOpen={updateArchivingAccountModalOpen}
      confirmText={
        unarchive
          ? "Are you sure you want to unarchive this account? This will move it back to your active accounts list."
          : "Are you sure you want to archive this account? This will remove it from your active accounts list. You can still view archived accounts and their details in the Archived Accounts section, and you can unarchive the account from there if needed."
      }
      saveButton={{
        text: unarchive ? "Unarchive" : "Archive",
        onClick: () => archiveTradingAccount(),
        loading: archiveLoading,
      }}
      error={currentTradingAccountErrors?.error}
      cancelButton={{
        text: "Cancel",
        onClick: () => updateArchivingAccountModalOpen(false),
      }}
    >
      <ListItemContainer>
        <AccountImage $image={currentTradingAccount.image || ""} />
        <AccountTitleContainer>
          <AccountTitle>{currentTradingAccount.name}</AccountTitle>
          <AccountSubtitle>
            Balance:
            <AccountSubtitleHighlighted>
              {formatter.format(currentTradingAccount.accountBalance)}
            </AccountSubtitleHighlighted>
          </AccountSubtitle>
          <AccountTradingDaysComplete>
            {`Eligible Days: ${currentTradingAccount?.currentDayCount ?? "N/A"}/${
              currentTradingAccount?.minTradingDays ?? "N/A"
            }`}
            <InfoPopout
              infoDescription={`This account requires a minimum of ${currentTradingAccount?.minTradingDays} eligible trading days before payout.`}
            />
          </AccountTradingDaysComplete>
        </AccountTitleContainer>
        <DaysContainer>
          {[...currentTradingAccount.dayValues]
            .reverse()
            .map((dayValue, idx) => (
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
        </DaysContainer>
      </ListItemContainer>
    </ModalWrapper>
  );
};

export default ArchiveAccountModal;
