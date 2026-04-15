import type { Trade } from "@interfaces/CustomTypes";
import { initialState } from "@pages/FundedAccounts/FundedAccountsState";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import useGetTradingAccountDetailHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountDetailHandler";
import useGetTradingAccountsHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountsHandler";
import { m } from "@utils/utils";
import { useCallback } from "react";
import useRecordPayoutApiCall from "./useRecordPayoutApiCall";

interface RecordPayoutHandler {
  recordPayout: (payout: Trade) => Promise<void>;
  loading: boolean;
}

const useRecordPayoutHandler = (): RecordPayoutHandler => {
  const { fetch, loading } = useRecordPayoutApiCall();
  const { currentTradingAccount, tradingAccounts } = useFundedAccountsState();
  const { updateSelectedTrade, updateAddTradeErrors, updateAddTradeModalOpen } =
    useFundedAccountsDispatch();
  const { getTradingAccount } = useGetTradingAccountDetailHandler();
  const { getTradingAccounts } = useGetTradingAccountsHandler();

  return {
    recordPayout: useCallback(
      async (payout: Trade) => {
        const useAccountId = payout.account.id || currentTradingAccount.id;

        const { error, data } = await fetch({
          data: {
            account: useAccountId,
            amount: payout.pnl,
            payout_date: m(payout.date).format(),
            journal_entry_id:
              payout.journalEntry !== null && payout.journalEntry?.id !== 0
                ? payout.journalEntry.id
                : null,
          },
        });

        if (!!data) {
          // Only update trading accounts list if on the funded accounts page
          // (i.e. tradingAccounts is not empty), otherwise just update the
          // current trading account details.
          if (tradingAccounts.length !== 0) {
            getTradingAccounts();
          }
          getTradingAccount(useAccountId.toString());
          updateSelectedTrade(initialState.selectedTrade);
          updateAddTradeModalOpen(false);
          updateAddTradeErrors({
            detail: "Payout record added successfully!",
          });
        } else if (error) {
          console.warn(error);
          if (!!(error as any).amount) {
            updateAddTradeErrors({
              amount: "Payout amount must be a valid number.",
            });
            return;
          }
          updateAddTradeErrors(
            error || {
              error:
                "An error occurred while recording the payout. Please try again.",
            },
          );
        }
      },
      [loading, currentTradingAccount.id],
    ),
    loading,
  };
};

export default useRecordPayoutHandler;
