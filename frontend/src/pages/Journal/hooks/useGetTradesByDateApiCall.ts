import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Trade } from "@interfaces/CustomTypes";

const useGetTradesByDateApiCall = (): AxiosFetchWrapperResponse<Trade[]> => {
  const { fetch, data, loading, error } = useAxiosFetch<Trade[]>(
    `trades/by-date/`,
    {
      method: "GET",
    },
  );

  return { fetch, data, loading, error };
};

export default useGetTradesByDateApiCall;
