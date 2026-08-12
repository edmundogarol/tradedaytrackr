import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { BudgetMonthlySummary } from "@interfaces/CustomTypes";

export interface GetMonthlyBudgetSummariesApiCallData {
  results: BudgetMonthlySummary[];
  count: number;
  next: string | null;
  previous: string | null;
}

const useGetMonthlyBudgetSummariesApiCall =
  (): AxiosFetchWrapperResponse<GetMonthlyBudgetSummariesApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GetMonthlyBudgetSummariesApiCallData>(
        `monthly-budget-summaries/`,
      );

    return { fetch, data, loading, error };
  };

export default useGetMonthlyBudgetSummariesApiCall;
