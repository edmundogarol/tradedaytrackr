import type {
  BudgetMonthlySummary,
  BudgetPurchase,
} from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import {
  type BudgetTrackingAction,
  updateAddPurchaseModalOpen,
  updateCreatePurchaseErrors,
  updateCurrentPage,
  updateDeletePurchaseErrors,
  updateDeletingPurchase,
  updateDeletingPurchaseModalOpen,
  updateItemsCount,
  updateMonthlySummaries,
  updateMonthlySummariesCurrentPage,
  updateMonthlySummariesErrors,
  updateNextPage,
  updatePurchases,
  updatePurchasesErrors,
  updateSelectedPurchase,
} from "../BudgetTrackingState";

interface BudgetTrackingDispatch {
  updatePurchases: (purchases: BudgetPurchase[]) => void;
  updatePurchasesErrors: (errors: { [key: string]: any }) => void;
  updateCurrentPage: (page: number) => void;
  updateItemsCount: (count: number) => void;
  updateNextPage: (nextPage: string | null) => void;
  updateMonthlySummaries: (summaries: BudgetMonthlySummary[]) => void;
  updateMonthlySummariesErrors: (errors: { [key: string]: any }) => void;
  updateMonthlySummariesCurrentPage: (page: number) => void;
  updateAddPurchaseModalOpen: (open: boolean) => void;
  updateSelectedPurchase: (purchase: Partial<BudgetPurchase>) => void;
  updateCreatePurchaseErrors: (errors: { [key: string]: any }) => void;
  updateDeletingPurchaseModalOpen: (open: boolean) => void;
  updateDeletingPurchase: (purchase: Partial<BudgetPurchase>) => void;
  updateDeletePurchaseErrors: (errors: { [key: string]: any }) => void;
}

export const useBudgetTrackingDispatch = (): BudgetTrackingDispatch => {
  const dispatch: Dispatch<BudgetTrackingAction> = useDispatch();
  return {
    updatePurchases(purchases: BudgetPurchase[]): void {
      dispatch(updatePurchases(purchases));
    },
    updatePurchasesErrors(errors: { [key: string]: any }): void {
      dispatch(updatePurchasesErrors(errors));
    },
    updateCurrentPage(page: number): void {
      dispatch(updateCurrentPage(page));
    },
    updateItemsCount(count: number): void {
      dispatch(updateItemsCount(count));
    },
    updateNextPage(nextPage: string | null): void {
      dispatch(updateNextPage(nextPage));
    },
    updateMonthlySummaries(summaries: BudgetMonthlySummary[]): void {
      dispatch(updateMonthlySummaries(summaries));
    },
    updateMonthlySummariesErrors(errors: { [key: string]: any }): void {
      dispatch(updateMonthlySummariesErrors(errors));
    },
    updateMonthlySummariesCurrentPage(page: number): void {
      dispatch(updateMonthlySummariesCurrentPage(page));
    },
    updateAddPurchaseModalOpen(open: boolean): void {
      dispatch(updateAddPurchaseModalOpen(open));
    },
    updateSelectedPurchase(purchase: Partial<BudgetPurchase>): void {
      dispatch(updateSelectedPurchase(purchase));
    },
    updateCreatePurchaseErrors(errors: { [key: string]: any }): void {
      dispatch(updateCreatePurchaseErrors(errors));
    },
    updateDeletingPurchaseModalOpen(open: boolean): void {
      dispatch(updateDeletingPurchaseModalOpen(open));
    },
    updateDeletingPurchase(purchase: Partial<BudgetPurchase>): void {
      dispatch(updateDeletingPurchase(purchase));
    },
    updateDeletePurchaseErrors(errors: { [key: string]: any }): void {
      dispatch(updateDeletePurchaseErrors(errors));
    },
  };
};

export default useBudgetTrackingDispatch;
