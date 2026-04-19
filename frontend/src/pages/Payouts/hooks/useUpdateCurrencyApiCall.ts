import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { TradingAccount } from "@interfaces/CustomTypes";

interface UpdateCurrencyApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useUpdateCurrencyApiCall = (): AxiosFetchWrapperResponse<
  TradingAccount,
  UpdateCurrencyApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    TradingAccount,
    UpdateCurrencyApiCallErrors
  >(`user/currency/`, {
    method: "POST",
  });

  return { fetch, data, loading, error };
};

export default useUpdateCurrencyApiCall;
