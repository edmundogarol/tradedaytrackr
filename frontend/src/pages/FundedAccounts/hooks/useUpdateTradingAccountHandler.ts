import type { TradingAccount } from "@interfaces/CustomTypes";

import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import { initialState } from "../FundedAccountsState";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useGetTradingAccountsHandler from "./useGetTradingAccountsHandler";
import useUpdateTradingAccountApiCall from "./useUpdateTradingAccountApiCall";

interface UpdateTradingAccountHandler {
  updateTradingAccount: (
    tradingAccount: TradingAccount,
    templateId: number,
  ) => Promise<void>;
  loading: boolean;
}

const useUpdateTradingAccountHandler = (): UpdateTradingAccountHandler => {
  const { fetch, loading } = useUpdateTradingAccountApiCall();
  const {
    updateSelectedTradingAccount,
    updateCurrentTradingAccountErrors,
    updateEditingFields,
  } = useFundedAccountsDispatch();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  return {
    updateTradingAccount: useCallback(
      async (tradingAccount: TradingAccount, templateId: number) => {
        const { error, data } = await fetch({
          data: {
            template_id: templateId,
            account_name: tradingAccount.name,
            account_balance: tradingAccount.accountBalance,
          },
          url: `${environmentConfig.HOST}/api/trading-accounts/${tradingAccount.id}/`,
        });

        if (!!data && data.id) {
          getTradingAccounts();
          updateSelectedTradingAccount(initialState.selectedTradingAccount);
          updateCurrentTradingAccountErrors({
            detail: "Account updated successfully!",
          });
          updateEditingFields({
            editingAccountBalance: false,
            editingAccountName: false,
            editingAccountTemplate: false,
          });
        } else if (error) {
          updateCurrentTradingAccountErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useUpdateTradingAccountHandler;
