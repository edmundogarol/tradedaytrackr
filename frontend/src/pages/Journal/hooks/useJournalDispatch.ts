import type { Trade } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { JournalEntry } from "../JournalInterfaces";
import type { JournalAction } from "../JournalState";
import {
  updateDetectedTrades,
  updateJournalEntries,
  updateJournalEntry,
  updateJournalErrors,
} from "../JournalState";

interface JournalDispatch {
  updateJournalEntry(journalEntry: JournalEntry): void;
  updateJournalErrors(journalErrors: { [key: string]: any }): void;
  updateDetectedTrades(detectedTrades: Trade[]): void;
  updateJournalEntries(journalEntries: JournalEntry[]): void;
}

export const useJournalDispatch = (): JournalDispatch => {
  const dispatch: Dispatch<JournalAction> = useDispatch();
  return {
    updateJournalEntry(journalEntry: JournalEntry): void {
      dispatch(updateJournalEntry(journalEntry));
    },
    updateJournalErrors(journalErrors: { [key: string]: any }): void {
      dispatch(updateJournalErrors(journalErrors));
    },
    updateDetectedTrades(detectedTrades: Trade[]): void {
      dispatch(updateDetectedTrades(detectedTrades));
    },
    updateJournalEntries(journalEntries: JournalEntry[]): void {
      dispatch(updateJournalEntries(journalEntries));
    },
  };
};

export default useJournalDispatch;
