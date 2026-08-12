import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { BudgetPurchase } from "@interfaces/CustomTypes";

export interface GetBudgetPurchasesApiCallData {
  results: BudgetPurchase[];
  count: number;
  next: string | null;
  previous: string | null;
}

const useGetBudgetPurchasesApiCall =
  (): AxiosFetchWrapperResponse<GetBudgetPurchasesApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GetBudgetPurchasesApiCallData>(`budget-purchases/`);

    return { fetch, data, loading, error };
  };

export default useGetBudgetPurchasesApiCall;
