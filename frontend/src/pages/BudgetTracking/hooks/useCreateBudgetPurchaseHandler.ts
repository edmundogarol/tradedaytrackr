import type { BudgetPurchase } from "@interfaces/CustomTypes";
import { useCallback } from "react";
import { initialSelectedPurchase } from "../BudgetTrackingState";
import useBudgetTrackingDispatch from "./useBudgetTrackingDispatch";
import useCreateBudgetPurchaseApiCall from "./useCreateBudgetPurchaseApiCall";
import useGetBudgetPurchasesHandler from "./useGetBudgetPurchasesHandler";
import useGetMonthlyBudgetSummariesHandler from "./useGetMonthlyBudgetSummariesHandler";

interface CreateBudgetPurchaseHandler {
  createBudgetPurchase: (purchase: Partial<BudgetPurchase>) => Promise<void>;
  loading: boolean;
}

const useCreateBudgetPurchaseHandler = (): CreateBudgetPurchaseHandler => {
  const { fetch, loading } = useCreateBudgetPurchaseApiCall();
  const { updateSelectedPurchase, updateAddPurchaseModalOpen, updateCreatePurchaseErrors } =
    useBudgetTrackingDispatch();
  const { getBudgetPurchases } = useGetBudgetPurchasesHandler();
  const { getMonthlyBudgetSummaries } = useGetMonthlyBudgetSummariesHandler();
  return {
    createBudgetPurchase: useCallback(
      async (purchase: Partial<BudgetPurchase>) => {
        const { error, data } = await fetch({
          data: {
            firm: purchase.firm,
            account_size: purchase.accountSize,
            cost: purchase.cost,
            purchase_date: purchase.purchaseDate,
            notes: purchase.notes,
          },
        });

        if (!!data && data.id) {
          getBudgetPurchases(1);
          getMonthlyBudgetSummaries();
          updateSelectedPurchase(initialSelectedPurchase);
          updateAddPurchaseModalOpen(false);
          updateCreatePurchaseErrors({});
        } else if (error) {
          updateCreatePurchaseErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useCreateBudgetPurchaseHandler;
