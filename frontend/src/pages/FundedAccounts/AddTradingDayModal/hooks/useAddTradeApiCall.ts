import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Trade } from "@interfaces/CustomTypes";

export interface AddTradeApiCallError {
  non_field_errors?: string[];
  account_id?: string[];
}

const useAddTradeApiCall = (): AxiosFetchWrapperResponse<
  Trade,
  AddTradeApiCallError
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    Trade,
    AddTradeApiCallError
  >(`trades/`, {
    method: "POST",
  });

  return { fetch, data, loading, error };
};

export default useAddTradeApiCall;
