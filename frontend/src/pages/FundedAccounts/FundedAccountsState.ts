import type { TradingAccount, TradingDay } from "@interfaces/CustomTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FundedAccountsState {
  readonly tradingAccounts: TradingAccount[];
  readonly selectedTradingAccount: TradingAccount;
  readonly currentTradingAccount: TradingAccount;
  readonly createTradingAccountModalOpen: boolean;
  readonly currentTradingAccountErrors: { [key: string]: any };
  readonly createTradingAccountErrors: { [key: string]: any };
  readonly updateTradingAccountsErrors?: { [key: string]: any };
  readonly selectedTradingDay: TradingDay | null;
  readonly addTradingDayModalOpen: boolean;
  readonly addTradingDayErrors: { [key: string]: any };
}

export const initialState: FundedAccountsState = {
  tradingAccounts: [],
  selectedTradingAccount: {
    id: 0,
    name: "",
    firm: undefined,
    image: undefined,
    accountSize: 0,
    minTradingDays: undefined,
    minBuffer: 0,
    allowablePayoutRequest: 0,
    profitSplit: undefined,
    minDayPnl: undefined,
    maxDrawdown: undefined,
    isEval: false,
    profitTarget: undefined,
    consistency: undefined,
    accountBalance: 0,
    bufferPercent: 0,
    dayValues: [],
    currentDayCount: 0,
    accountType: {
      id: 0,
      name: "",
      isEval: false,
    },
  },
  currentTradingAccount: {
    id: 0,
    name: "",
    firm: undefined,
    image: undefined,
    accountSize: 0,
    minTradingDays: undefined,
    minBuffer: 0,
    allowablePayoutRequest: 0,
    profitSplit: undefined,
    minDayPnl: undefined,
    maxDrawdown: undefined,
    isEval: false,
    profitTarget: undefined,
    consistency: undefined,
    accountBalance: 0,
    bufferPercent: 0,
    dayValues: [],
    currentDayCount: 0,
    accountType: {
      id: 0,
      name: "",
      isEval: false,
    },
  },
  selectedTradingDay: null,
  createTradingAccountModalOpen: false,
  createTradingAccountErrors: {},
  updateTradingAccountsErrors: {},
  currentTradingAccountErrors: {},
  addTradingDayModalOpen: false,
  addTradingDayErrors: {},
};

type UpdateTradingAccountsAction = PayloadAction<TradingAccount[]>;
type UpdateSelectedTradingAccountAction = PayloadAction<TradingAccount>;
type UpdateCreateTradingAccountModalOpenAction = PayloadAction<boolean>;
type UpdateCreateTradingAccountErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateTradingAccountsErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateSelectedTradingDayAction = PayloadAction<TradingDay | null>;
type UpdateAddTradingDayModalOpenAction = PayloadAction<boolean>;
type UpdateAddTradingDayErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateCurrentTradingAccountErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateCurrentTradingAccountAction = PayloadAction<TradingAccount>;

export type FundedAccountsAction =
  | UpdateTradingAccountsAction
  | UpdateSelectedTradingAccountAction
  | UpdateCreateTradingAccountModalOpenAction
  | UpdateCreateTradingAccountErrorsAction
  | UpdateTradingAccountsErrorsAction
  | UpdateSelectedTradingDayAction
  | UpdateAddTradingDayModalOpenAction
  | UpdateAddTradingDayErrorsAction
  | UpdateCurrentTradingAccountAction
  | UpdateCurrentTradingAccountErrorsAction;

export const fundedAccountsSlice = createSlice({
  name: "fundedAccounts",
  initialState,
  reducers: {
    updateTradingAccounts: (state, action: UpdateTradingAccountsAction) => {
      state.tradingAccounts = action.payload;
    },
    updateSelectedTradingAccount: (
      state,
      action: UpdateSelectedTradingAccountAction,
    ) => {
      state.selectedTradingAccount = action.payload;
    },
    updateCreateTradingAccountModalOpen: (
      state,
      action: UpdateCreateTradingAccountModalOpenAction,
    ) => {
      state.createTradingAccountModalOpen = action.payload;
    },
    updateCreateTradingAccountErrors: (
      state,
      action: UpdateCreateTradingAccountErrorsAction,
    ) => {
      state.createTradingAccountErrors = action.payload;
    },
    updateTradingAccountsErrors: (
      state,
      action: UpdateTradingAccountsErrorsAction,
    ) => {
      state.updateTradingAccountsErrors = action.payload;
    },
    updateSelectedTradingDay: (
      state,
      action: UpdateSelectedTradingDayAction,
    ) => {
      state.selectedTradingDay = action.payload;
    },
    updateAddTradingDayModalOpen: (
      state,
      action: UpdateAddTradingDayModalOpenAction,
    ) => {
      state.addTradingDayModalOpen = action.payload;
    },
    updateAddTradingDayErrors: (
      state,
      action: UpdateAddTradingDayErrorsAction,
    ) => {
      state.addTradingDayErrors = action.payload;
    },
    updateCurrentTradingAccount: (
      state,
      action: UpdateCurrentTradingAccountAction,
    ) => {
      state.currentTradingAccount = action.payload;
    },
    updateCurrentTradingAccountErrors: (
      state,
      action: UpdateCurrentTradingAccountErrorsAction,
    ) => {
      state.currentTradingAccountErrors = action.payload;
    },
  },
});

export const {
  updateTradingAccounts,
  updateSelectedTradingAccount,
  updateCreateTradingAccountModalOpen,
  updateCreateTradingAccountErrors,
  updateTradingAccountsErrors,
  updateSelectedTradingDay,
  updateAddTradingDayModalOpen,
  updateAddTradingDayErrors,
  updateCurrentTradingAccount,
  updateCurrentTradingAccountErrors,
} = fundedAccountsSlice.actions;

export const fundedAccountsReducer = fundedAccountsSlice.reducer;
export default fundedAccountsSlice.reducer;
