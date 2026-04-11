import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { TradingAccount } from "@interfaces/CustomTypes";

const useGetTradingAccountDetailApiCall =
  (): AxiosFetchWrapperResponse<TradingAccount> => {
    const { fetch, data, loading, error } = useAxiosFetch<TradingAccount>(
      `trading-accounts/`,
      {
        method: "GET",
      },
    );

    return { fetch, data, loading, error };
  };

export default useGetTradingAccountDetailApiCall;
