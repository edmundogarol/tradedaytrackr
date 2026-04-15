import type { Trade } from "@interfaces/CustomTypes";
import { initialState } from "@pages/FundedAccounts/FundedAccountsState";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import useGetTradingAccountDetailHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountDetailHandler";
import useGetTradingAccountsHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountsHandler";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import useUpdatePayoutApiCall from "./useUpdatePayoutApiCall";

interface UpdatePayoutHandler {
  updatePayout: (payout: Trade) => Promise<void>;
  loading: boolean;
}

const useUpdatePayoutHandler = (): UpdatePayoutHandler => {
  const { fetch, loading } = useUpdatePayoutApiCall();
  const { currentTradingAccount, tradingAccounts } = useFundedAccountsState();
  const { updateSelectedTrade, updateAddTradeErrors, updateAddTradeModalOpen } =
    useFundedAccountsDispatch();
  const { getTradingAccount } = useGetTradingAccountDetailHandler();
  const { getTradingAccounts } = useGetTradingAccountsHandler();

  return {
    updatePayout: useCallback(
      async (payout: Trade) => {
        const useAccountId = payout.account.id || currentTradingAccount.id;

        const { error, data } = await fetch({
          url: `${environmentConfig.HOST}/api/payouts/${payout.id.toString().replace("payout-", "")}/`,
          data: {
            account_id: useAccountId,
            amount: payout.pnl,
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
            detail: "Payout record updated successfully!",
          });
        } else if (error) {
          console.warn(error);
          updateAddTradeErrors(
            error || {
              error:
                "An error occurred while updating the payout. Please try again.",
            },
          );
        }
      },
      [loading, currentTradingAccount.id],
    ),
    loading,
  };
};

export default useUpdatePayoutHandler;
