import type {
  DashboardSummaries,
  EvaluationAccount,
  Trade,
  TradingAccount,
} from "@interfaces/CustomTypes";
import type { JournalEntry } from "@pages/Journal/JournalInterfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

export interface FundedAccountsState {
  readonly tradingAccounts: (TradingAccount | EvaluationAccount)[];
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
  readonly evalFirmFilter: string[];
  readonly evalStatusFilter: string[];
  readonly selectedDateJournalEntries: JournalEntry[];
  readonly deleteTradeModalOpen: boolean;
  readonly deleteTradeErrors: { [key: string]: any };
  readonly archivedTradingAccounts: (TradingAccount | EvaluationAccount)[];
  readonly archivedTradingAccountsErrors?: { [key: string]: any };
  readonly archivedTradingAccountsNextPage?: string;
  readonly archivedTradingAccountsItemCount?: number;
  readonly archivingAccountModalOpen: boolean;
  readonly dashboardSummaries: DashboardSummaries;
  readonly currentDayValuesPage: number;
}

const initialSummaries: DashboardSummaries = {
  upcomingPayout: {
    expected: 0,
    projectedDate: "",
    daysCompleted: 0,
    minDays: 0,
    daysRemaining: 0,
  },
  currentStats: {
    withdrawablePnl: 0,
    daysToPayout: 0,
    activePas: 0,
    nearPayout: false,
    winRate: 0,
  },
  fundingOverview: {
    totalActiveFunding: 0,
    firms: {},
  },
  evaluations: {
    passed: 0,
    total: 0,
  },
  buffer: {
    groups: [],
  },
};

const initialAccount: TradingAccount | EvaluationAccount = {
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
  dayValuesNextPage: undefined,
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
  isArchived: false,
};

export const initialState: FundedAccountsState = {
  tradingAccounts: [],
  selectedTradingAccount: initialAccount,
  currentTradingAccount: initialAccount,
  selectedTrade: {
    id: 0,
    date: moment().format("YYYY-MM-DD"),
    pnl: null,
    account: {
      id: 0,
      name: "",
      type: "",
    },
    journalEntry: {
      id: 0,
    } as JournalEntry,
    isPayout: false,
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
  evalFirmFilter: [],
  evalStatusFilter: [],
  selectedDateJournalEntries: [],
  deleteTradeModalOpen: false,
  deleteTradeErrors: {},
  archivedTradingAccounts: [],
  archivedTradingAccountsErrors: {},
  archivedTradingAccountsNextPage: undefined,
  archivedTradingAccountsItemCount: 0,
  archivingAccountModalOpen: false,
  dashboardSummaries: initialSummaries,
  currentDayValuesPage: 1,
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
type UpdateDeleteTradeModalOpenAction = PayloadAction<boolean>;
type UpdateDeleteTradeErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateEvalFirmFilterAction = PayloadAction<string[]>;
type UpdateEvalStatusFilterAction = PayloadAction<string[]>;
type UpdateArchivedTradingAccountsAction = PayloadAction<
  (TradingAccount | EvaluationAccount)[]
>;
type UpdateArchivedTradingAccountsErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateArchivedTradingAccountsNextPageAction = PayloadAction<
  string | undefined
>;
type UpdateArchivedTradingAccountsItemCountAction = PayloadAction<number>;
type UpdateArchivingAccountModalOpenAction = PayloadAction<boolean>;
type UpdateDashboardSummariesAction = PayloadAction<DashboardSummaries>;
type UpdateCurrentDayValuesPageAction = PayloadAction<number>;

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
  | UpdateSelectedDateJournalEntriesAction
  | UpdateDeleteTradeModalOpenAction
  | UpdateDeleteTradeErrorsAction
  | UpdateEvalFirmFilterAction
  | UpdateEvalStatusFilterAction
  | UpdateArchivedTradingAccountsAction
  | UpdateArchivedTradingAccountsErrorsAction
  | UpdateArchivedTradingAccountsNextPageAction
  | UpdateArchivedTradingAccountsItemCountAction
  | UpdateArchivingAccountModalOpenAction
  | UpdateDashboardSummariesAction
  | UpdateCurrentDayValuesPageAction;

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
    updateDeleteTradeModalOpen: (
      state,
      action: UpdateDeleteTradeModalOpenAction,
    ) => {
      state.deleteTradeModalOpen = action.payload;
    },
    updateDeleteTradeErrors: (state, action: UpdateDeleteTradeErrorsAction) => {
      state.deleteTradeErrors = action.payload;
    },
    updateEvalFirmFilter: (state, action: UpdateEvalFirmFilterAction) => {
      state.evalFirmFilter = action.payload;
    },
    updateEvalStatusFilter: (state, action: UpdateEvalStatusFilterAction) => {
      state.evalStatusFilter = action.payload;
    },
    updateArchivedTradingAccounts: (
      state,
      action: UpdateArchivedTradingAccountsAction,
    ) => {
      state.archivedTradingAccounts = action.payload;
    },
    updateArchivedTradingAccountsErrors: (
      state,
      action: UpdateArchivedTradingAccountsErrorsAction,
    ) => {
      state.archivedTradingAccountsErrors = action.payload;
    },
    updateArchivedTradingAccountsNextPage: (
      state,
      action: UpdateArchivedTradingAccountsNextPageAction,
    ) => {
      state.archivedTradingAccountsNextPage = action.payload;
    },
    updateArchivedTradingAccountsItemCount: (
      state,
      action: UpdateArchivedTradingAccountsItemCountAction,
    ) => {
      state.archivedTradingAccountsItemCount = action.payload;
    },
    updateArchivingAccountModalOpen: (
      state,
      action: UpdateArchivingAccountModalOpenAction,
    ) => {
      state.archivingAccountModalOpen = action.payload;
    },
    updateDashboardSummaries: (
      state,
      action: UpdateDashboardSummariesAction,
    ) => {
      state.dashboardSummaries = action.payload;
    },
    updateCurrentDayValuesPage: (
      state,
      action: UpdateCurrentDayValuesPageAction,
    ) => {
      state.currentDayValuesPage = action.payload;
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
  updateDeleteTradeModalOpen,
  updateDeleteTradeErrors,
  updateEvalFirmFilter,
  updateEvalStatusFilter,
  updateArchivedTradingAccounts,
  updateArchivedTradingAccountsErrors,
  updateArchivedTradingAccountsNextPage,
  updateArchivedTradingAccountsItemCount,
  updateArchivingAccountModalOpen,
  updateDashboardSummaries,
  updateCurrentDayValuesPage,
} = fundedAccountsSlice.actions;

export const fundedAccountsReducer = fundedAccountsSlice.reducer;
export default fundedAccountsSlice.reducer;
