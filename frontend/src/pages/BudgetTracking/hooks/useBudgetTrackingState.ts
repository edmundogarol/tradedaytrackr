import type { StoreState } from "@redux/interfaces";
import { useSelector } from "react-redux";
import type { BudgetTrackingState } from "../BudgetTrackingState";

const useBudgetTrackingState = (): BudgetTrackingState => {
  return useSelector((state: StoreState) => state.budgetTracking);
};

export default useBudgetTrackingState;
