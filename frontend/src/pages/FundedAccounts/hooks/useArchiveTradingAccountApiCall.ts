import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

const useArchiveTradingAccountApiCall = (): AxiosFetchWrapperResponse<{}> => {
  const { fetch, data, loading, error } = useAxiosFetch<{}>(
    `trading-accounts/`,
    {
      method: "POST",
    },
  );

  return { fetch, data, loading, error };
};

export default useArchiveTradingAccountApiCall;
