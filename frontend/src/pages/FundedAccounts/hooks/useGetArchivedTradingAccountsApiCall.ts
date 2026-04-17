import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type {
  EvaluationAccount,
  TradingAccount,
} from "@interfaces/CustomTypes";

export interface GetArchivedTradingAccountsApiCallData {
  results: (TradingAccount | EvaluationAccount)[];
  count: number;
  next: string | null;
}

const useGetArchivedTradingAccountsApiCall =
  (): AxiosFetchWrapperResponse<GetArchivedTradingAccountsApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GetArchivedTradingAccountsApiCallData>(
        `trading-accounts-archived/`,
      );

    return { fetch, data, loading, error };
  };

export default useGetArchivedTradingAccountsApiCall;
