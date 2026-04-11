import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Trade } from "@interfaces/CustomTypes";

const useUpdateTradeApiCall = (): AxiosFetchWrapperResponse<Trade> => {
  const { fetch, data, loading, error } = useAxiosFetch<Trade>(`trades/`, {
    method: "PATCH",
  });

  return { fetch, data, loading, error };
};

export default useUpdateTradeApiCall;
