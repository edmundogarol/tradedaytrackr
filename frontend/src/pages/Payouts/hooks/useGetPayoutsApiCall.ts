import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Payout } from "@interfaces/CustomTypes";

export interface GetPayoutsApiCallData {
  results: Payout[];
  count: number;
  next: string | null;
  previous: string | null;
}

const useGetPayoutsApiCall =
  (): AxiosFetchWrapperResponse<GetPayoutsApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GetPayoutsApiCallData>(`payouts/list/`);

    return { fetch, data, loading, error };
  };

export default useGetPayoutsApiCall;
