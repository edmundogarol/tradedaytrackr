import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import { initialState } from "../FundedAccountsState";
import useDeleteTradingAccountApiCall from "./useDeleteTradingAccountApiCall";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useGetTradingAccountsHandler from "./useGetTradingAccountsHandler";

interface DeleteTradingAccountHandler {
  deleteTradingAccount: (id: string) => Promise<void>;
  loading: boolean;
}

const useDeleteTradingAccountHandler = (): DeleteTradingAccountHandler => {
  const { fetch, loading } = useDeleteTradingAccountApiCall();
  const { updateTradingAccountsErrors, updateSelectedTradingAccount } =
    useFundedAccountsDispatch();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  return {
    deleteTradingAccount: useCallback(
      async (id: string) => {
        const { error } = await fetch({
          url: `${environmentConfig.HOST}/api/trading-account-templates/${id}/`,
        });

        if (error) {
          updateTradingAccountsErrors({
            error: (error as any)?.message || "Something went wrong",
          });
        } else {
          getTradingAccounts();
          updateTradingAccountsErrors({
            detail: "Trading account deleted successfully",
          });
          updateSelectedTradingAccount(initialState.selectedTradingAccount);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useDeleteTradingAccountHandler;
