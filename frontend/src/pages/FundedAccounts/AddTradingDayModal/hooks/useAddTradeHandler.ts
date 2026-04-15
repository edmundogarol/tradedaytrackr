import type { Trade } from "@interfaces/CustomTypes";
import { initialState } from "@pages/FundedAccounts/FundedAccountsState";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import useGetTradingAccountDetailHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountDetailHandler";
import useGetTradingAccountsHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountsHandler";
import { useCallback } from "react";
import type { AddTradeApiCallError } from "./useAddTradeApiCall";
import useAddTradeApiCall from "./useAddTradeApiCall";

interface AddTradeHandler {
  addTrade: (trade: Trade) => Promise<void>;
  loading: boolean;
}

const useAddTradeHandler = (): AddTradeHandler => {
  const { fetch, loading } = useAddTradeApiCall();
  const { currentTradingAccount } = useFundedAccountsState();
  const { updateSelectedTrade, updateAddTradeErrors, updateAddTradeModalOpen } =
    useFundedAccountsDispatch();
  const { getTradingAccount } = useGetTradingAccountDetailHandler();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  return {
    addTrade: useCallback(
      async (trade: Trade) => {
        const useAccountId = trade.account.id || currentTradingAccount.id;

        const { error, data } = await fetch({
          data: {
            pnl: trade.pnl,
            date: trade.date,
            account_id: useAccountId,
            journal_entry_id:
              trade.journalEntry !== null && trade.journalEntry?.id !== 0
                ? trade.journalEntry.id
                : undefined,
          },
        });

        if (!!data) {
          getTradingAccount(useAccountId.toString());
          getTradingAccounts();
          updateSelectedTrade(initialState.selectedTrade);
          updateAddTradeModalOpen(false);
          updateAddTradeErrors({
            detail: "Trade added successfully!",
          });
        } else if (error) {
          console.warn(error);
          if ((error as AddTradeApiCallError).non_field_errors) {
            updateAddTradeErrors({
              error: (error as AddTradeApiCallError).non_field_errors?.[0],
            });
            return;
          } else if (
            (error as AddTradeApiCallError).account_id instanceof Array &&
            (error as AddTradeApiCallError).account_id?.[0] ===
              'Invalid pk "0" - object does not exist.'
          ) {
            updateAddTradeErrors({
              error: "The selected account does not exist.",
            });
            return;
          }
          updateAddTradeErrors(
            error || {
              error:
                "An error occurred while adding the trade. Please try again.",
            },
          );
        }
      },
      [loading, currentTradingAccount.id],
    ),
    loading,
  };
};

export default useAddTradeHandler;
