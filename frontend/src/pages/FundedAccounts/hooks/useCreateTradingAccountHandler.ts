import type { TradingAccount } from "@interfaces/CustomTypes";
import { useCallback } from "react";
import { initialState } from "../FundedAccountsState";
import useCreateTradingAccountApiCall from "./useCreateTradingAccountApiCall";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useGetTradingAccountsHandler from "./useGetTradingAccountsHandler";

interface CreateTradingAccountHandler {
  createTradingAccount: (
    tradingAccount: TradingAccount,
    templateId: number,
  ) => Promise<void>;
  loading: boolean;
}

const useCreateTradingAccountHandler = (): CreateTradingAccountHandler => {
  const { fetch, loading } = useCreateTradingAccountApiCall();
  const {
    updateSelectedTradingAccount,
    updateCreateTradingAccountModalOpen,
    updateCreateTradingAccountErrors,
  } = useFundedAccountsDispatch();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  return {
    createTradingAccount: useCallback(
      async (tradingAccount: TradingAccount, templateId: number) => {
        const { error, data } = await fetch({
          data: {
            template_id: templateId,
            account_name: tradingAccount.name,
            baseline_balance: tradingAccount.accountBalance,
          },
        });

        if (!!data && data.id) {
          getTradingAccounts();
          updateSelectedTradingAccount(initialState.selectedTradingAccount);
          updateCreateTradingAccountModalOpen(false);
          updateCreateTradingAccountErrors({
            detail: "Trading account created successfully!",
          });
        } else if (error) {
          if (!!(error as any).template_id) {
            updateCreateTradingAccountErrors({
              error:
                "An error occurred assigning the account template. Please try again.",
            });
            return;
          }
          updateCreateTradingAccountErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useCreateTradingAccountHandler;
