import type {
  BudgetMonthlySummary,
  BudgetPurchase,
} from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface BudgetTrackingState {
  readonly purchases: BudgetPurchase[];
  readonly purchasesErrors?: {
    [key: string]: string;
  };
  readonly currentPage: number;
  readonly itemsCount: number;
  readonly nextPage?: string | null;
  readonly monthlySummaries: BudgetMonthlySummary[];
  readonly monthlySummariesErrors?: {
    [key: string]: string;
  };
  readonly monthlySummariesCurrentPage: number;
  readonly addPurchaseModalOpen: boolean;
  readonly selectedPurchase: Partial<BudgetPurchase>;
  readonly createPurchaseErrors?: {
    [key: string]: any;
  };
  readonly deletingPurchaseModalOpen: boolean;
  readonly deletingPurchase: Partial<BudgetPurchase>;
  readonly deletePurchaseErrors?: {
    [key: string]: any;
  };
}

export const initialSelectedPurchase: Partial<BudgetPurchase> = {
  firm: "apex",
  cost: undefined,
  accountSize: undefined,
  purchaseDate: undefined,
  notes: "",
};

export const initialState: BudgetTrackingState = {
  purchases: [],
  purchasesErrors: {},
  currentPage: 1,
  itemsCount: 0,
  nextPage: undefined,
  monthlySummaries: [],
  monthlySummariesErrors: {},
  monthlySummariesCurrentPage: 1,
  addPurchaseModalOpen: false,
  selectedPurchase: initialSelectedPurchase,
  createPurchaseErrors: {},
  deletingPurchaseModalOpen: false,
  deletingPurchase: {},
  deletePurchaseErrors: {},
};

type UpdatePurchasesAction = PayloadAction<BudgetPurchase[]>;
type UpdatePurchasesErrorsAction = PayloadAction<{ [key: string]: string }>;
type UpdateCurrentPageAction = PayloadAction<number>;
type UpdateItemsCountAction = PayloadAction<number>;
type UpdateNextPageAction = PayloadAction<string | null>;
type UpdateMonthlySummariesAction = PayloadAction<BudgetMonthlySummary[]>;
type UpdateMonthlySummariesErrorsAction = PayloadAction<{
  [key: string]: string;
}>;
type UpdateMonthlySummariesCurrentPageAction = PayloadAction<number>;
type UpdateAddPurchaseModalOpenAction = PayloadAction<boolean>;
type UpdateSelectedPurchaseAction = PayloadAction<Partial<BudgetPurchase>>;
type UpdateCreatePurchaseErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateDeletingPurchaseModalOpenAction = PayloadAction<boolean>;
type UpdateDeletingPurchaseAction = PayloadAction<Partial<BudgetPurchase>>;
type UpdateDeletePurchaseErrorsAction = PayloadAction<{
  [key: string]: any;
}>;

export type BudgetTrackingAction =
  | UpdatePurchasesAction
  | UpdatePurchasesErrorsAction
  | UpdateCurrentPageAction
  | UpdateItemsCountAction
  | UpdateNextPageAction
  | UpdateMonthlySummariesAction
  | UpdateMonthlySummariesErrorsAction
  | UpdateMonthlySummariesCurrentPageAction
  | UpdateAddPurchaseModalOpenAction
  | UpdateSelectedPurchaseAction
  | UpdateCreatePurchaseErrorsAction
  | UpdateDeletingPurchaseModalOpenAction
  | UpdateDeletingPurchaseAction
  | UpdateDeletePurchaseErrorsAction;

export const budgetTrackingSlice = createSlice({
  name: "budgetTracking",
  initialState,
  reducers: {
    updatePurchases: (state, action: UpdatePurchasesAction) => {
      state.purchases = action.payload;
    },
    updatePurchasesErrors: (state, action: UpdatePurchasesErrorsAction) => {
      state.purchasesErrors = action.payload;
    },
    updateCurrentPage: (state, action: UpdateCurrentPageAction) => {
      state.currentPage = action.payload;
    },
    updateItemsCount: (state, action: UpdateItemsCountAction) => {
      state.itemsCount = action.payload;
    },
    updateNextPage: (state, action: UpdateNextPageAction) => {
      state.nextPage = action.payload;
    },
    updateMonthlySummaries: (state, action: UpdateMonthlySummariesAction) => {
      state.monthlySummaries = action.payload;
    },
    updateMonthlySummariesErrors: (
      state,
      action: UpdateMonthlySummariesErrorsAction,
    ) => {
      state.monthlySummariesErrors = action.payload;
    },
    updateMonthlySummariesCurrentPage: (
      state,
      action: UpdateMonthlySummariesCurrentPageAction,
    ) => {
      state.monthlySummariesCurrentPage = action.payload;
    },
    updateAddPurchaseModalOpen: (
      state,
      action: UpdateAddPurchaseModalOpenAction,
    ) => {
      state.addPurchaseModalOpen = action.payload;
    },
    updateSelectedPurchase: (state, action: UpdateSelectedPurchaseAction) => {
      state.selectedPurchase = action.payload;
    },
    updateCreatePurchaseErrors: (
      state,
      action: UpdateCreatePurchaseErrorsAction,
    ) => {
      state.createPurchaseErrors = action.payload;
    },
    updateDeletingPurchaseModalOpen: (
      state,
      action: UpdateDeletingPurchaseModalOpenAction,
    ) => {
      state.deletingPurchaseModalOpen = action.payload;
    },
    updateDeletingPurchase: (state, action: UpdateDeletingPurchaseAction) => {
      state.deletingPurchase = action.payload;
    },
    updateDeletePurchaseErrors: (
      state,
      action: UpdateDeletePurchaseErrorsAction,
    ) => {
      state.deletePurchaseErrors = action.payload;
    },
  },
});

export const {
  updatePurchases,
  updatePurchasesErrors,
  updateCurrentPage,
  updateItemsCount,
  updateNextPage,
  updateMonthlySummaries,
  updateMonthlySummariesErrors,
  updateMonthlySummariesCurrentPage,
  updateAddPurchaseModalOpen,
  updateSelectedPurchase,
  updateCreatePurchaseErrors,
  updateDeletingPurchaseModalOpen,
  updateDeletingPurchase,
  updateDeletePurchaseErrors,
} = budgetTrackingSlice.actions;
export const budgetTrackingReducer = budgetTrackingSlice.reducer;

export default budgetTrackingSlice.reducer;
