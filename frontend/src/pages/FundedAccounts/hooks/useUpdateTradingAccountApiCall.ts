import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { TradingAccount } from "@interfaces/CustomTypes";

interface UpdateTradingAccountApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useUpdateTradingAccountApiCall = (): AxiosFetchWrapperResponse<
  TradingAccount,
  UpdateTradingAccountApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    TradingAccount,
    UpdateTradingAccountApiCallErrors
  >(`trading-accounts/`, {
    method: "PATCH",
  });

  return { fetch, data, loading, error };
};

export default useUpdateTradingAccountApiCall;
