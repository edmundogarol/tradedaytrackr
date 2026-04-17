import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import { initialState } from "../FundedAccountsState";
import useDeleteTradingAccountApiCall from "./useDeleteTradingAccountApiCall";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useFundedAccountsState from "./useFundedAccountsState";
import useGetArchivedTradingAccountsHandler from "./useGetArchivedTradingAccountsHandler";
import useGetTradingAccountsHandler from "./useGetTradingAccountsHandler";

interface DeleteTradingAccountHandler {
  deleteTradingAccount: (id: string, redirect: PageEnum) => Promise<void>;
  loading: boolean;
}

const useDeleteTradingAccountHandler = (): DeleteTradingAccountHandler => {
  const { fetch, loading } = useDeleteTradingAccountApiCall();
  const {
    updateSelectedTradingAccount,
    updateDeletingTradingAccountModalOpen,
    updateDeleteTradingAccountErrors,
  } = useFundedAccountsDispatch();
  const { currentTradingAccount } = useFundedAccountsState();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  const { getArchivedTradingAccounts } = useGetArchivedTradingAccountsHandler();
  const navigation = useReactNavigation();
  return {
    deleteTradingAccount: useCallback(
      async (id: string, redirect: PageEnum) => {
        const { error } = await fetch({
          url: `${environmentConfig.HOST}/api/trading-accounts/${id}/`,
        });

        if (error) {
          updateDeleteTradingAccountErrors({
            error: (error as any)?.message || "Something went wrong",
          });
        } else {
          if (redirect === PageEnum.Preferences) {
            getArchivedTradingAccounts(1);
          }
          getTradingAccounts();
          updateDeleteTradingAccountErrors({
            detail: "Trading account deleted successfully",
          });
          updateDeletingTradingAccountModalOpen(false);
          updateSelectedTradingAccount(initialState.selectedTradingAccount);
          navigation.navigate(redirect);
        }
      },
      [loading, currentTradingAccount.id],
    ),
    loading,
  };
};

export default useDeleteTradingAccountHandler;
