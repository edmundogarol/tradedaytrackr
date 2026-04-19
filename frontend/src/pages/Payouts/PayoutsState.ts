import type { Payout, PayoutMonthlySummary } from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface PayoutsState {
  readonly payouts: Payout[];
  readonly payoutsErrors?: {
    [key: string]: string;
  };
  readonly firmFilter?: string;
  readonly startDateFilter?: string;
  readonly endDateFilter?: string;
  readonly currentPage: number;
  readonly itemsCount: number;
  readonly nextPage?: string | null;
  readonly monthlySummaries: PayoutMonthlySummary[];
  readonly monthlySummariesErrors?: {
    [key: string]: string;
  };
  readonly monthlySummariesCurrentPage: number;
  readonly monthlySummariesNextPage?: string | null;
  readonly monthlySummariesPrevPage?: string | null;
}

export const initialState: PayoutsState = {
  payouts: [],
  payoutsErrors: {},
  firmFilter: undefined,
  startDateFilter: undefined,
  endDateFilter: undefined,
  currentPage: 1,
  itemsCount: 0,
  nextPage: undefined,
  monthlySummaries: [],
  monthlySummariesErrors: {},
  monthlySummariesCurrentPage: 1,
  monthlySummariesNextPage: undefined,
  monthlySummariesPrevPage: undefined,
};

type UpdatePayoutsAction = PayloadAction<Payout[]>;
type UpdatePayoutsErrorsAction = PayloadAction<{
  [key: string]: string;
}>;
type UpdateFirmFilterAction = PayloadAction<string | undefined>;
type UpdateStartDateFilterAction = PayloadAction<string | undefined>;
type UpdateEndDateFilterAction = PayloadAction<string | undefined>;
type UpdateCurrentPageAction = PayloadAction<number>;
type UpdateItemsCountAction = PayloadAction<number>;
type UpdateNextPageAction = PayloadAction<string | null>;
type UpdateMonthlySummariesAction = PayloadAction<PayoutMonthlySummary[]>;
type UpdateMonthlySummariesErrorsAction = PayloadAction<{
  [key: string]: string;
}>;
type UpdateMonthlySummariesCurrentPageAction = PayloadAction<number>;
type UpdateMonthlySummariesNextPageAction = PayloadAction<string | null>;
type UpdateMonthlySummariesPrevPageAction = PayloadAction<string | null>;

export type PayoutsAction =
  | UpdatePayoutsAction
  | UpdatePayoutsErrorsAction
  | UpdateFirmFilterAction
  | UpdateStartDateFilterAction
  | UpdateEndDateFilterAction
  | UpdateCurrentPageAction
  | UpdateItemsCountAction
  | UpdateNextPageAction
  | UpdateMonthlySummariesAction
  | UpdateMonthlySummariesErrorsAction
  | UpdateMonthlySummariesCurrentPageAction
  | UpdateMonthlySummariesNextPageAction
  | UpdateMonthlySummariesPrevPageAction;

export const payoutsSlice = createSlice({
  name: "payouts",
  initialState,
  reducers: {
    updatePayouts: (state, action: UpdatePayoutsAction) => {
      state.payouts = action.payload;
    },
    updatePayoutsErrors: (state, action: UpdatePayoutsErrorsAction) => {
      state.payoutsErrors = action.payload;
    },
    updateFirmFilter: (state, action: UpdateFirmFilterAction) => {
      state.firmFilter = action.payload;
    },
    updateStartDateFilter: (state, action: UpdateStartDateFilterAction) => {
      state.startDateFilter = action.payload;
    },
    updateEndDateFilter: (state, action: UpdateEndDateFilterAction) => {
      state.endDateFilter = action.payload;
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
    updateMonthlySummariesNextPage: (
      state,
      action: UpdateMonthlySummariesNextPageAction,
    ) => {
      state.monthlySummariesNextPage = action.payload;
    },
    updateMonthlySummariesPrevPage: (
      state,
      action: UpdateMonthlySummariesPrevPageAction,
    ) => {
      state.monthlySummariesPrevPage = action.payload;
    },
  },
});

export const {
  updatePayouts,
  updatePayoutsErrors,
  updateFirmFilter,
  updateStartDateFilter,
  updateEndDateFilter,
  updateCurrentPage,
  updateItemsCount,
  updateNextPage,
  updateMonthlySummaries,
  updateMonthlySummariesErrors,
  updateMonthlySummariesCurrentPage,
  updateMonthlySummariesNextPage,
  updateMonthlySummariesPrevPage,
} = payoutsSlice.actions;
export const payoutsReducer = payoutsSlice.reducer;

export default payoutsSlice.reducer;
