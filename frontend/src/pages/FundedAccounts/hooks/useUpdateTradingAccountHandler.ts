import type { TradingAccount } from "@interfaces/CustomTypes";

import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import { initialState } from "../FundedAccountsState";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useGetTradingAccountsHandler from "./useGetTradingAccountsHandler";
import useUpdateTradingAccountApiCall from "./useUpdateTradingAccountApiCall";

interface UpdateTradingAccountHandler {
  updateTradingAccount: (tradingAccount: TradingAccount) => Promise<void>;
  loading: boolean;
}

const useUpdateTradingAccountHandler = (): UpdateTradingAccountHandler => {
  const { fetch, loading } = useUpdateTradingAccountApiCall();
  const {
    updateSelectedTradingAccount,
    updateCreateTradingAccountErrors,
    updateCreateTradingAccountModalOpen,
  } = useFundedAccountsDispatch();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  return {
    updateTradingAccount: useCallback(
      async (tradingAccount: TradingAccount) => {
        const { error, data } = await fetch({
          data: {
            name: tradingAccount.name,
            account_balance: tradingAccount.accountBalance,
          },
          url: `${environmentConfig.HOST}/api/trading-account-templates/${tradingAccount.id}/`,
        });

        if (!!data && data.id) {
          getTradingAccounts();
          updateSelectedTradingAccount(initialState.selectedTradingAccount);
          updateCreateTradingAccountModalOpen(false);
          updateCreateTradingAccountErrors({
            detail: "Account template updated successfully!",
          });
        } else if (error) {
          updateCreateTradingAccountErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useUpdateTradingAccountHandler;
