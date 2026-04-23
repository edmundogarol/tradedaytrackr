import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { TradingDay } from "@interfaces/CustomTypes";
import useFundedAccountsState from "./useFundedAccountsState";

export interface GetTradingDaysApiCallData {
  results: TradingDay[];
  count: number;
  next: string | null;
}

const useGetTradingDaysApiCall =
  (): AxiosFetchWrapperResponse<GetTradingDaysApiCallData> => {
    const { currentTradingAccount } = useFundedAccountsState();
    const { fetch, data, loading, error } =
      useAxiosFetch<GetTradingDaysApiCallData>(
        `trading-days/?account_id=${currentTradingAccount.id}`,
      );

    return { fetch, data, loading, error };
  };

export default useGetTradingDaysApiCall;
