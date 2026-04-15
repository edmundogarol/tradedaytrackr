import type { Payout } from "@interfaces/CustomTypes";
import { initialState } from "@pages/FundedAccounts/FundedAccountsState";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import useGetTradingAccountDetailHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountDetailHandler";
import useGetTradingAccountsHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountsHandler";
import { useCallback } from "react";
import useRecordPayoutApiCall from "./useRecordPayoutApiCall";

interface RecordPayoutHandler {
  recordPayout: (payout: Payout) => Promise<void>;
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
      async (payout: Payout) => {
        const useAccountId = payout.account || currentTradingAccount.id;

        const { error, data } = await fetch({
          data: {
            account_id: useAccountId,
            amount: payout.amount,
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
