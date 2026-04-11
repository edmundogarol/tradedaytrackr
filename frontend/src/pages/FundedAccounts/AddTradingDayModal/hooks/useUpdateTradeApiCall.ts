import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Trade } from "@interfaces/CustomTypes";
import type { AddTradeApiCallError } from "./useAddTradeApiCall";

const useUpdateTradeApiCall = (): AxiosFetchWrapperResponse<
  Trade,
  AddTradeApiCallError
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    Trade,
    AddTradeApiCallError
  >(`trades/`, {
    method: "PATCH",
  });

  return { fetch, data, loading, error };
};

export default useUpdateTradeApiCall;
