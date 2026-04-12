import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import ModalWrapper from "@components/Modal/Modal";
import { AccountTradingDaysComplete } from "@pages/EvaluationAccounts/EvaluationAccountsStyledComponents";
import { color } from "@styles/colors";
import { HorizontalSection, SectionText } from "@styles/globalStyledComponents";
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
import useDeleteTradingAccountHandler from "../hooks/useDeleteTradingAccountHandler";
import useFundedAccountsDispatch from "../hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "../hooks/useFundedAccountsState";

const DeleteTradingAccountModal: React.FunctionComponent = () => {
  const {
    currentTradingAccount,
    deletingTradingAccountModalOpen,
    deleteTradingAccountErrors,
  } = useFundedAccountsState();
  const {
    updateDeletingTradingAccountModalOpen,
    updateDeleteTradingAccountErrors,
  } = useFundedAccountsDispatch();
  const { deleteTradingAccount } = useDeleteTradingAccountHandler();

  return (
    <ModalWrapper
      onClose={() => updateDeleteTradingAccountErrors({})}
      open={deletingTradingAccountModalOpen}
      setOpen={updateDeletingTradingAccountModalOpen}
      title="Delete Trading Account"
    >
      <SectionText>
        Are you sure you want to delete this trading account? All associated
        data will be permanently removed.
      </SectionText>
      <Gap level={2} />
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
      <Gap level={2} />
      <If condition={!!deleteTradingAccountErrors.error}>
        <FormError error={deleteTradingAccountErrors?.error} />
        <Gap level={2} />
      </If>
      <HorizontalSection>
        <Button
          text={"Permanently Delete"}
          style={{ backgroundColor: color("SystemRed") }}
          onClick={() =>
            deleteTradingAccount(currentTradingAccount.id.toString())
          }
        />
        <Button
          text={"Cancel"}
          onClick={() => {
            updateDeletingTradingAccountModalOpen(false);
            updateDeleteTradingAccountErrors({});
          }}
        />
      </HorizontalSection>
    </ModalWrapper>
  );
};

export default DeleteTradingAccountModal;
