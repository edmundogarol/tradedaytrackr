import type { Trade, TradingAccount } from "@interfaces/CustomTypes";
import type { JournalEntry } from "@pages/Journal/JournalInterfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

export interface FundedAccountsState {
  readonly tradingAccounts: TradingAccount[];
  readonly selectedTradingAccount: TradingAccount;
  readonly currentTradingAccount: TradingAccount;
  readonly createTradingAccountModalOpen: boolean;
  readonly currentTradingAccountErrors: { [key: string]: any };
  readonly createTradingAccountErrors: { [key: string]: any };
  readonly updateTradingAccountsErrors?: { [key: string]: any };
  readonly selectedTrade: Trade;
  readonly addTradeModalOpen: boolean;
  readonly addTradeErrors: { [key: string]: any };
  readonly editingAccountBalance: boolean;
  readonly editingAccountName: boolean;
  readonly editingAccountTemplate: boolean;
  readonly deletingTradingAccountModalOpen: boolean;
  readonly deleteTradingAccountErrors: { [key: string]: any };
  readonly firmFilter: string[];
  readonly bufferFilter: string[];
  readonly selectedDateJournalEntries: JournalEntry[];
}

const initialAccount: TradingAccount = {
  id: 0,
  name: "",
  firm: undefined,
  image: undefined,
  accountSize: 0,
  baseline_balance: 0,
  minTradingDays: undefined,
  minBuffer: 0,
  minPayoutRequest: 0,
  maxPayoutRequest: 0,
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
  postPayoutBuffer: 0,
  withdrawableAmount: 0,
  consistencyScore: 0,
  accountType: {
    id: 0,
    name: "",
    isEval: false,
    firm: "",
  },
};

export const initialState: FundedAccountsState = {
  tradingAccounts: [],
  selectedTradingAccount: initialAccount,
  currentTradingAccount: initialAccount,
  selectedTrade: {
    id: 0,
    date: moment().format("YYYY-MM-DD"),
    pnl: 0,
    account: {
      id: 0,
      name: "",
      type: "",
    },
    journalEntry: {
      id: 0,
    } as JournalEntry,
  },
  createTradingAccountModalOpen: false,
  createTradingAccountErrors: {},
  updateTradingAccountsErrors: {},
  currentTradingAccountErrors: {},
  editingAccountBalance: false,
  editingAccountName: false,
  editingAccountTemplate: false,
  addTradeModalOpen: false,
  addTradeErrors: {},
  deletingTradingAccountModalOpen: false,
  deleteTradingAccountErrors: {},
  firmFilter: [],
  bufferFilter: [],
  selectedDateJournalEntries: [],
};

type UpdateTradingAccountsAction = PayloadAction<TradingAccount[]>;
type UpdateSelectedTradingAccountAction = PayloadAction<TradingAccount>;
type UpdateCreateTradingAccountModalOpenAction = PayloadAction<boolean>;
type UpdateCreateTradingAccountErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateTradingAccountsErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateSelectedTradeAction = PayloadAction<Trade>;
type UpdateAddTradeModalOpenAction = PayloadAction<boolean>;
type UpdateAddTradeErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateCurrentTradingAccountErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateCurrentTradingAccountAction = PayloadAction<TradingAccount>;
type UpdateEditingFieldsAction = PayloadAction<{
  editingAccountBalance?: boolean;
  editingAccountName?: boolean;
  editingAccountTemplate?: boolean;
}>;
type UpdateDeletingTradingAccountModalOpenAction = PayloadAction<boolean>;
type UpdateDeleteTradingAccountErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateFirmFilterAction = PayloadAction<string[]>;
type UpdateBufferFilterAction = PayloadAction<string[]>;
type UpdateSelectedDateJournalEntriesAction = PayloadAction<JournalEntry[]>;

export type FundedAccountsAction =
  | UpdateTradingAccountsAction
  | UpdateSelectedTradingAccountAction
  | UpdateCreateTradingAccountModalOpenAction
  | UpdateCreateTradingAccountErrorsAction
  | UpdateTradingAccountsErrorsAction
  | UpdateSelectedTradeAction
  | UpdateAddTradeModalOpenAction
  | UpdateAddTradeErrorsAction
  | UpdateCurrentTradingAccountAction
  | UpdateCurrentTradingAccountErrorsAction
  | UpdateEditingFieldsAction
  | UpdateDeletingTradingAccountModalOpenAction
  | UpdateDeleteTradingAccountErrorsAction
  | UpdateFirmFilterAction
  | UpdateBufferFilterAction
  | UpdateSelectedDateJournalEntriesAction;

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
    updateSelectedTrade: (state, action: UpdateSelectedTradeAction) => {
      state.selectedTrade = action.payload;
    },
    updateAddTradeModalOpen: (state, action: UpdateAddTradeModalOpenAction) => {
      state.addTradeModalOpen = action.payload;
    },
    updateAddTradeErrors: (state, action: UpdateAddTradeErrorsAction) => {
      state.addTradeErrors = action.payload;
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
    updateEditingFields: (state, action: UpdateEditingFieldsAction) => {
      state.editingAccountBalance =
        action.payload.editingAccountBalance ?? state.editingAccountBalance;
      state.editingAccountName =
        action.payload.editingAccountName ?? state.editingAccountName;
      state.editingAccountTemplate =
        action.payload.editingAccountTemplate ?? state.editingAccountTemplate;
    },
    updateDeletingTradingAccountModalOpen: (
      state,
      action: UpdateDeletingTradingAccountModalOpenAction,
    ) => {
      state.deletingTradingAccountModalOpen = action.payload;
    },
    updateDeleteTradingAccountErrors: (
      state,
      action: UpdateDeleteTradingAccountErrorsAction,
    ) => {
      state.deleteTradingAccountErrors = action.payload;
    },
    updateFirmFilter: (state, action: UpdateFirmFilterAction) => {
      state.firmFilter = action.payload;
    },
    updateBufferFilter: (state, action: UpdateBufferFilterAction) => {
      state.bufferFilter = action.payload;
    },
    updateSelectedDateJournalEntries: (
      state,
      action: UpdateSelectedDateJournalEntriesAction,
    ) => {
      state.selectedDateJournalEntries = action.payload;
    },
  },
});

export const {
  updateTradingAccounts,
  updateSelectedTradingAccount,
  updateCreateTradingAccountModalOpen,
  updateCreateTradingAccountErrors,
  updateTradingAccountsErrors,
  updateSelectedTrade,
  updateAddTradeModalOpen,
  updateAddTradeErrors,
  updateCurrentTradingAccount,
  updateCurrentTradingAccountErrors,
  updateEditingFields,
  updateDeletingTradingAccountModalOpen,
  updateDeleteTradingAccountErrors,
  updateFirmFilter,
  updateBufferFilter,
  updateSelectedDateJournalEntries,
} = fundedAccountsSlice.actions;

export const fundedAccountsReducer = fundedAccountsSlice.reducer;
export default fundedAccountsSlice.reducer;
