import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { PayoutMonthlySummary } from "@interfaces/CustomTypes";

export interface GetMonthlyPayoutSummariesApiCallData {
  results: PayoutMonthlySummary[];
  count: number;
  next: string | null;
  previous: string | null;
}

const useGetMonthlyPayoutSummariesApiCall =
  (): AxiosFetchWrapperResponse<GetMonthlyPayoutSummariesApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GetMonthlyPayoutSummariesApiCallData>(
        `monthly-payout-summaries/`,
      );

    return { fetch, data, loading, error };
  };

export default useGetMonthlyPayoutSummariesApiCall;
