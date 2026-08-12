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
    // Only pass this when the user actually edited the balance field.
    // account_balance is a derived value (baseline_balance + trades -
    // payouts), so it must be sent as baseline_balance, and only when it's
    // genuinely changing — sending the account's current (already-derived)
    // balance on an unrelated name/template edit would double-count it the
    // next time a trade is saved.
    newBaselineBalance?: number,
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
      async (
        tradingAccount: TradingAccount,
        templateId: number,
        newBaselineBalance?: number,
      ) => {
        const { error, data } = await fetch({
          data: {
            template_id: templateId,
            account_name: tradingAccount.name,
            ...(newBaselineBalance !== undefined
              ? { baseline_balance: newBaselineBalance }
              : {}),
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
