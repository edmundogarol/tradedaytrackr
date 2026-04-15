import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Payout } from "@interfaces/CustomTypes";

const useUpdatePayoutApiCall = (): AxiosFetchWrapperResponse<Payout> => {
  const { fetch, data, loading, error } = useAxiosFetch<Payout>(`payouts/`, {
    method: "PATCH",
  });

  return { fetch, data, loading, error };
};

export default useUpdatePayoutApiCall;
