import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import { initialState } from "../FundedAccountsState";
import useArchiveTradingAccountApiCall from "./useArchiveTradingAccountApiCall";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useFundedAccountsState from "./useFundedAccountsState";
import useGetArchivedTradingAccountsHandler from "./useGetArchivedTradingAccountsHandler";
import useGetTradingAccountsHandler from "./useGetTradingAccountsHandler";

interface ArchiveTradingAccountHandler {
  archiveTradingAccount: () => Promise<void>;
  loading: boolean;
}

const useArchiveTradingAccountHandler = (): ArchiveTradingAccountHandler => {
  const { fetch, loading } = useArchiveTradingAccountApiCall();
  const {
    updateSelectedTradingAccount,
    updateCurrentTradingAccountErrors,
    updateEditingFields,
    updateArchivingAccountModalOpen,
  } = useFundedAccountsDispatch();
  const { currentTradingAccount } = useFundedAccountsState();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  const { getArchivedTradingAccounts } = useGetArchivedTradingAccountsHandler();
  const navigation = useReactNavigation();
  return {
    archiveTradingAccount: useCallback(async () => {
      const archiveMethod = currentTradingAccount.isArchived
        ? "unarchive"
        : "archive";
      const { error, data } = await fetch({
        url: `${environmentConfig.HOST}/api/trading-accounts/${currentTradingAccount.id}/${archiveMethod}/`,
      });

      if (!!data) {
        getTradingAccounts();
        getArchivedTradingAccounts(1);
        updateSelectedTradingAccount(initialState.selectedTradingAccount);
        updateCurrentTradingAccountErrors({
          detail: `Account ${archiveMethod}d successfully!`,
        });
        updateEditingFields({
          editingAccountBalance: false,
          editingAccountName: false,
          editingAccountTemplate: false,
        });
        navigation.navigate(
          currentTradingAccount.accountType.isEval
            ? PageEnum.EvaluationAccounts
            : PageEnum.FundedAccounts,
        );
        updateArchivingAccountModalOpen(false);
      } else if (error) {
        updateCurrentTradingAccountErrors(error);
      }
    }, [loading, currentTradingAccount.id]),
    loading,
  };
};

export default useArchiveTradingAccountHandler;
