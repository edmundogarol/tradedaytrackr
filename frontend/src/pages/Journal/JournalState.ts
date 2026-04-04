import type { Trade } from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import type { JournalEntry } from "./JournalInterfaces";

export interface JournalState {
  readonly journalEntry: JournalEntry;
  readonly journalErrors: { [key: string]: any };
  readonly detectedTrades: Trade[];
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
    trades: [],
    totalPnL: 0,
    tags: [],
    accounts: [],
  },
  journalErrors: {},
  detectedTrades: [],
};

type UpdateJournalEntryAction = PayloadAction<JournalEntry>;
type UpdateJournalErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateDetectedTradesAction = PayloadAction<Trade[]>;

export type JournalAction =
  | UpdateJournalEntryAction
  | UpdateJournalErrorsAction
  | UpdateDetectedTradesAction;

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
  },
});

export const { updateJournalEntry, updateJournalErrors, updateDetectedTrades } =
  journalSlice.actions;

export const journalReducer = journalSlice.reducer;

export default journalSlice.reducer;
