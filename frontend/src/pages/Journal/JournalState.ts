import type { Trade } from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import type { JournalEntry } from "./JournalInterfaces";

export interface JournalState {
  readonly journalEntry: JournalEntry;
  readonly journalErrors: { [key: string]: any };
  readonly editingJournalEntry: boolean;
  readonly detectedTrades: Trade[];
  readonly journalEntries: JournalEntry[];
  readonly selectedDateTrades: Trade[];
  readonly selectedDateTradesErrors: { [key: string]: any };
  readonly deleteJournalEntryModalOpen: boolean;
  readonly deleteJournalEntryErrors: { [key: string]: any };
  readonly fundedView?: boolean;
}

export const initialState: JournalState = {
  journalEntry: {
    id: 0,
    dateTime: moment().toISOString(),
    risk: 0,
    contracts: 0,
    outcome: 0,
    instrument: "",
    description: "",
    image: "",
    imageUrl: "",
    tradeIds: [],
    totalPnl: 0,
    accountCount: 0,
    tags: [],
    accounts: [],
  },
  journalEntries: [],
  journalErrors: {},
  editingJournalEntry: false,
  detectedTrades: [],
  selectedDateTrades: [],
  selectedDateTradesErrors: {},
  deleteJournalEntryModalOpen: false,
  deleteJournalEntryErrors: {},
  fundedView: true,
};

type UpdateJournalEntryAction = PayloadAction<JournalEntry>;
type UpdateJournalErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateDetectedTradesAction = PayloadAction<Trade[]>;
type UpdateJournalEntriesAction = PayloadAction<JournalEntry[]>;
type UpdateSelectedDateTradesAction = PayloadAction<Trade[]>;
type UpdateSelectedDateTradesErrorsAction = PayloadAction<{
  [key: string]: any;
}>;

type UpdateDeleteJournalEntryModalOpenAction = PayloadAction<boolean>;
type UpdateDeleteJournalEntryErrorsAction = PayloadAction<{
  [key: string]: any;
}>;
type UpdateEditingJournalEntryAction = PayloadAction<boolean>;
type UpdateFundedViewAction = PayloadAction<boolean>;

export type JournalAction =
  | UpdateJournalEntryAction
  | UpdateJournalErrorsAction
  | UpdateDetectedTradesAction
  | UpdateJournalEntriesAction
  | UpdateSelectedDateTradesAction
  | UpdateSelectedDateTradesErrorsAction
  | UpdateDeleteJournalEntryModalOpenAction
  | UpdateDeleteJournalEntryErrorsAction
  | UpdateEditingJournalEntryAction
  | UpdateFundedViewAction;

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    updateJournalEntry: (state, action: UpdateJournalEntryAction) => {
      state.journalEntry = { ...state.journalEntry, ...action.payload };
    },
    updateJournalErrors: (state, action: UpdateJournalErrorsAction) => {
      state.journalErrors = { ...state.journalErrors, ...action.payload };
    },
    updateDetectedTrades: (state, action: UpdateDetectedTradesAction) => {
      state.detectedTrades = action.payload;
    },
    updateJournalEntries: (state, action: UpdateJournalEntriesAction) => {
      state.journalEntries = action.payload;
    },
    updateSelectedDateTrades: (
      state,
      action: UpdateSelectedDateTradesAction,
    ) => {
      state.selectedDateTrades = action.payload;
    },
    updateSelectedDateTradesErrors: (
      state,
      action: UpdateSelectedDateTradesErrorsAction,
    ) => {
      state.selectedDateTradesErrors = action.payload;
    },
    updateDeleteJournalEntryModalOpen: (
      state,
      action: UpdateDeleteJournalEntryModalOpenAction,
    ) => {
      state.deleteJournalEntryModalOpen = action.payload;
    },
    updateDeleteJournalEntryErrors: (
      state,
      action: UpdateDeleteJournalEntryErrorsAction,
    ) => {
      state.deleteJournalEntryErrors = action.payload;
    },
    updateEditingJournalEntry: (
      state,
      action: UpdateEditingJournalEntryAction,
    ) => {
      state.editingJournalEntry = action.payload;
    },
    updateFundedView: (state, action: UpdateFundedViewAction) => {
      state.fundedView = action.payload;
    },
  },
});

export const {
  updateJournalEntry,
  updateJournalErrors,
  updateDetectedTrades,
  updateJournalEntries,
  updateSelectedDateTrades,
  updateSelectedDateTradesErrors,
  updateDeleteJournalEntryModalOpen,
  updateDeleteJournalEntryErrors,
  updateEditingJournalEntry,
  updateFundedView,
} = journalSlice.actions;

export const journalReducer = journalSlice.reducer;

export default journalSlice.reducer;
