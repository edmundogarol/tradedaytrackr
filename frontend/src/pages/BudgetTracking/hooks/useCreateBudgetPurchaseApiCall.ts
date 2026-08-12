import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { BudgetPurchase } from "@interfaces/CustomTypes";

export interface CreateBudgetPurchaseApiCallErrors {
  firm?: string;
  cost?: string;
  account_size?: string;
  purchase_date?: string;
  error?: string;
}

const useCreateBudgetPurchaseApiCall = (): AxiosFetchWrapperResponse<
  BudgetPurchase,
  CreateBudgetPurchaseApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    BudgetPurchase,
    CreateBudgetPurchaseApiCallErrors
  >(`budget-purchases/`, { method: "POST" });

  return { fetch, data, loading, error };
};

export default useCreateBudgetPurchaseApiCall;
