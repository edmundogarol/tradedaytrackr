import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import useBudgetTrackingDispatch from "./useBudgetTrackingDispatch";
import useDeleteBudgetPurchaseApiCall from "./useDeleteBudgetPurchaseApiCall";
import useGetBudgetPurchasesHandler from "./useGetBudgetPurchasesHandler";
import useGetMonthlyBudgetSummariesHandler from "./useGetMonthlyBudgetSummariesHandler";

interface DeleteBudgetPurchaseHandler {
  deleteBudgetPurchase: (id: number) => Promise<void>;
  loading: boolean;
}

const useDeleteBudgetPurchaseHandler = (): DeleteBudgetPurchaseHandler => {
  const { fetch, loading } = useDeleteBudgetPurchaseApiCall();
  const {
    updatePurchasesErrors,
    updateDeletePurchaseErrors,
    updateDeletingPurchaseModalOpen,
    updateDeletingPurchase,
  } = useBudgetTrackingDispatch();
  const { getBudgetPurchases } = useGetBudgetPurchasesHandler();
  const { getMonthlyBudgetSummaries } = useGetMonthlyBudgetSummariesHandler();
  return {
    deleteBudgetPurchase: useCallback(
      async (id: number) => {
        const { error } = await fetch({
          url: `${environmentConfig.HOST}/api/budget-purchases/${id}/`,
        });

        if (error) {
          updateDeletePurchaseErrors({
            error: (error as any)?.message || "Something went wrong",
          });
        } else {
          getBudgetPurchases(1);
          getMonthlyBudgetSummaries();
          updateDeletingPurchaseModalOpen(false);
          updateDeletingPurchase({});
          updateDeletePurchaseErrors({});
          updatePurchasesErrors({
            detail: "Purchase deleted successfully",
          });
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useDeleteBudgetPurchaseHandler;
