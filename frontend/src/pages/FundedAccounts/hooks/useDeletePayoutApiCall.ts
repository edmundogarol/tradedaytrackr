import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

const useDeletePayoutApiCall = (): AxiosFetchWrapperResponse<{}> => {
  const { fetch, data, loading, error } = useAxiosFetch<{}>(`payouts/`, {
    method: "DELETE",
  });

  return { fetch, data, loading, error };
};

export default useDeletePayoutApiCall;
