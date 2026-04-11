import type { Trade } from "@interfaces/CustomTypes";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useUpdateTradeApiCall from "./useUpdateTradeApiCall";

interface UpdateTradeHandler {
  updateTrade: (trade: Trade) => Promise<void>;
  loading: boolean;
}

const useUpdateTradeHandler = (): UpdateTradeHandler => {
  const { fetch, loading } = useUpdateTradeApiCall();
  const { updateSelectedTrade } = useFundedAccountsDispatch();

  return {
    updateTrade: useCallback(
      async (trade: Trade) => {
        const { error, data } = await fetch({
          data: trade,
        });

        if (!!data) {
          updateSelectedTrade(keysToCamel(data));
        } else if (error) {
          console.warn(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useUpdateTradeHandler;
