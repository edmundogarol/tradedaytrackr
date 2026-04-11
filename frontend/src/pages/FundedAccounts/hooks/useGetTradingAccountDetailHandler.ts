import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useGetTradingAccountDetailApiCall from "./useGetTradingAccountDetailApiCall";

interface GetTradingAccountDetailHandler {
  getTradingAccount: (accountId: string) => Promise<void>;
  loading: boolean;
}

const useGetTradingAccountDetailHandler =
  (): GetTradingAccountDetailHandler => {
    const { fetch, loading } = useGetTradingAccountDetailApiCall();
    const { updateCurrentTradingAccountErrors, updateCurrentTradingAccount } =
      useFundedAccountsDispatch();
    return {
      getTradingAccount: useCallback(
        async (accountId: string) => {
          const { error, data } = await fetch({
            url: `${environmentConfig.HOST}/api/trading-accounts/${accountId}/`,
          });

          if (!!data) {
            updateCurrentTradingAccount(keysToCamel(data));
          } else if (error) {
            updateCurrentTradingAccountErrors(error);
          }
        },
        [loading],
      ),
      loading,
    };
  };

export default useGetTradingAccountDetailHandler;
