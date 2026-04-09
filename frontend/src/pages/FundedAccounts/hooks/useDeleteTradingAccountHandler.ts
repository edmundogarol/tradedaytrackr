import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
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
  const {
    updateSelectedTradingAccount,
    updateDeletingTradingAccountModalOpen,
    updateDeleteTradingAccountErrors,
  } = useFundedAccountsDispatch();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  const navigation = useReactNavigation();
  return {
    deleteTradingAccount: useCallback(
      async (id: string) => {
        const { error } = await fetch({
          url: `${environmentConfig.HOST}/api/trading-accounts/${id}/`,
        });

        if (error) {
          updateDeleteTradingAccountErrors({
            error: (error as any)?.message || "Something went wrong",
          });
        } else {
          getTradingAccounts();
          updateDeleteTradingAccountErrors({
            detail: "Trading account deleted successfully",
          });
          updateDeletingTradingAccountModalOpen(false);
          updateSelectedTradingAccount(initialState.selectedTradingAccount);
          navigation.navigate(PageEnum.FundedAccounts);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useDeleteTradingAccountHandler;
