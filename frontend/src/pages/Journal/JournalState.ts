import type { Trade } from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import type { JournalEntry } from "./JournalInterfaces";
import { mockJournalEntries } from "./mocks/journalEntries";

export interface JournalState {
  readonly journalEntry: JournalEntry;
  readonly journalErrors: { [key: string]: any };
  readonly detectedTrades: Trade[];
  readonly journalEntries: JournalEntry[];
}

export const initialState: JournalState = {
  journalEntry: {
    id: 0,
    date_time: moment().toISOString(),
    risk: 0,
    contracts: 0,
    outcome: 0,
    instrument: "",
    description: "",
    image: "",
    trades: [],
    totalPnL: 0,
    tags: [],
    accounts: [],
  },
  journalEntries: mockJournalEntries,
  journalErrors: {},
  detectedTrades: [],
};

type UpdateJournalEntryAction = PayloadAction<JournalEntry>;
type UpdateJournalErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateDetectedTradesAction = PayloadAction<Trade[]>;
type UpdateJournalEntriesAction = PayloadAction<JournalEntry[]>;

export type JournalAction =
  | UpdateJournalEntryAction
  | UpdateJournalErrorsAction
  | UpdateDetectedTradesAction
  | UpdateJournalEntriesAction;

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
  },
});

export const {
  updateJournalEntry,
  updateJournalErrors,
  updateDetectedTrades,
  updateJournalEntries,
} = journalSlice.actions;

export const journalReducer = journalSlice.reducer;

export default journalSlice.reducer;
