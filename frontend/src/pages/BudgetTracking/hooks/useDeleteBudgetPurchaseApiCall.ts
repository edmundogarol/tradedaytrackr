import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

const useDeleteBudgetPurchaseApiCall = (): AxiosFetchWrapperResponse<{}> => {
  const { fetch, data, loading, error } = useAxiosFetch<{}>(
    `budget-purchases/`,
    { method: "DELETE" },
  );

  return { fetch, data, loading, error };
};

export default useDeleteBudgetPurchaseApiCall;
