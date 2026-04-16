import { useCallback } from "react";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useGetTradingAccountsApiCall from "./useGetTradingAccountsApiCall";
import useMapApiToTradingAccount from "./useMapApiCallToTradingAccount";

interface GetTradingAccountHandler {
  getTradingAccounts: () => Promise<void>;
  loading: boolean;
}

const useGetTradingAccountsHandler = (): GetTradingAccountHandler => {
  const { fetch, loading } = useGetTradingAccountsApiCall();
  const { updateTradingAccounts, updateTradingAccountsErrors } =
    useFundedAccountsDispatch();
  const mapApiToTradingAccount = useMapApiToTradingAccount();
  return {
    getTradingAccounts: useCallback(async () => {
      const { error, data } = await fetch();

      if (!!data) {
        const tradingAccountsMapped = data.map((tradingAccount) =>
          mapApiToTradingAccount(tradingAccount),
        );
        updateTradingAccounts(tradingAccountsMapped);
      } else if (error) {
        updateTradingAccountsErrors(error);
      }
    }, [loading]),
    loading,
  };
};

export default useGetTradingAccountsHandler;
