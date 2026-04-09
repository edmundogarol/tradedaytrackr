import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { TradingAccount } from "@interfaces/CustomTypes";

interface CreateTradingAccountApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useCreateTradingAccountApiCall = (): AxiosFetchWrapperResponse<
  TradingAccount,
  CreateTradingAccountApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    TradingAccount,
    CreateTradingAccountApiCallErrors
  >(`trading-accounts/`, {
    method: "POST",
  });

  return { fetch, data, loading, error };
};

export default useCreateTradingAccountApiCall;
