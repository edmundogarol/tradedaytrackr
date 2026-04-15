import type { Trade } from "@interfaces/CustomTypes";
import { initialState } from "@pages/FundedAccounts/FundedAccountsState";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import useGetTradingAccountDetailHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountDetailHandler";
import useGetTradingAccountsHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountsHandler";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import type { AddTradeApiCallError } from "./useAddTradeApiCall";
import useUpdateTradeApiCall from "./useUpdateTradeApiCall";

interface UpdateTradeHandler {
  updateTrade: (trade: Trade) => Promise<void>;
  loading: boolean;
}

const useUpdateTradeHandler = (): UpdateTradeHandler => {
  const { fetch, loading } = useUpdateTradeApiCall();
  const { currentTradingAccount, tradingAccounts } = useFundedAccountsState();
  const { updateSelectedTrade, updateAddTradeErrors, updateAddTradeModalOpen } =
    useFundedAccountsDispatch();
  const { getTradingAccount } = useGetTradingAccountDetailHandler();
  const { getTradingAccounts } = useGetTradingAccountsHandler();

  return {
    updateTrade: useCallback(
      async (trade: Trade) => {
        const useAccountId = trade.account.id || currentTradingAccount.id;
        const { error, data } = await fetch({
          url: `${environmentConfig.HOST}/api/trades/${trade.id}/`,
          data: {
            pnl: trade.pnl,
            date: trade.date,
            account_id: useAccountId,
            journal_entry_id:
              trade.journalEntry !== null && trade.journalEntry?.id !== 0
                ? trade.journalEntry.id
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
            detail: "Trade updated successfully!",
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
          } else if (
            (error as AddTradeApiCallError).pnl &&
            (error as AddTradeApiCallError).pnl?.[0].includes("null")
          ) {
            updateAddTradeErrors({
              error: "Please enter a valid P&L value.",
            });
            return;
          }
          updateAddTradeErrors(
            error || {
              error:
                "An error occurred while updating the trade. Please try again.",
            },
          );
        }
      },
      [loading, currentTradingAccount.id, tradingAccounts],
    ),
    loading,
  };
};

export default useUpdateTradeHandler;
