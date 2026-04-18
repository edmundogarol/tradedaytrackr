import environmentConfig from "@utils/environmentConfig";
import { set } from "lodash";
import { useCallback } from "react";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useFundedAccountsState from "./useFundedAccountsState";
import useGetArchivedTradingAccountsApiCall from "./useGetArchivedTradingAccountsApiCall";
import useMapApiToTradingAccount from "./useMapApiCallToTradingAccount";

interface GetArchivedTradingAccountsHandler {
  getArchivedTradingAccounts: (page: number) => Promise<void>;
  loading: boolean;
}

const useGetArchivedTradingAccountsHandler =
  (): GetArchivedTradingAccountsHandler => {
    const { fetch, loading } = useGetArchivedTradingAccountsApiCall();
    const { archivedTradingAccountsNextPage } = useFundedAccountsState();
    const {
      updateArchivedTradingAccounts,
      updateArchivedTradingAccountsErrors,
      updateArchivedTradingAccountsNextPage,
      updateArchivedTradingAccountsItemCount,
      updateArchivingAccountModalOpen,
    } = useFundedAccountsDispatch();
    const mapApiToTradingAccount = useMapApiToTradingAccount();
    return {
      getArchivedTradingAccounts: useCallback(
        async (page: number) => {
          const options = {};
          if (page > 1 && archivedTradingAccountsNextPage) {
            set(
              options,
              "url",
              `${environmentConfig.HOST}/api/trading-accounts-archived/?page=${page}`,
            );
          }

          const { error, data } = await fetch(options);

          if (!!data) {
            const tradingAccountsMapped = data.results.map((tradingAccount) =>
              mapApiToTradingAccount(tradingAccount),
            );
            updateArchivedTradingAccountsNextPage(data?.next || "");
            updateArchivedTradingAccountsItemCount(data.count);
            updateArchivedTradingAccounts(tradingAccountsMapped);
            updateArchivingAccountModalOpen(false);
          } else if (error) {
            updateArchivedTradingAccountsErrors(error);
          }
        },
        [loading],
      ),
      loading,
    };
  };

export default useGetArchivedTradingAccountsHandler;
