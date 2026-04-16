import type { Trade } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { JournalEntry } from "../JournalInterfaces";
import type { JournalAction } from "../JournalState";
import {
  updateDeleteJournalEntryErrors,
  updateDeleteJournalEntryModalOpen,
  updateDetectedTrades,
  updateEditingJournalEntry,
  updateJournalEntries,
  updateJournalEntry,
  updateJournalErrors,
  updateSelectedDateTrades,
  updateSelectedDateTradesErrors,
} from "../JournalState";

interface JournalDispatch {
  updateJournalEntry(journalEntry: JournalEntry): void;
  updateJournalErrors(journalErrors: { [key: string]: any }): void;
  updateDetectedTrades(detectedTrades: Trade[]): void;
  updateJournalEntries(journalEntries: JournalEntry[]): void;
  updateSelectedDateTrades(selectedDateTrades: Trade[]): void;
  updateSelectedDateTradesErrors(selectedDateTradesErrors: {
    [key: string]: any;
  }): void;
  updateDeleteJournalEntryModalOpen(deleteJournalEntryModalOpen: boolean): void;
  updateDeleteJournalEntryErrors(deleteJournalEntryErrors: {
    [key: string]: any;
  }): void;
  updateEditingJournalEntry(editingJournalEntry: boolean): void;
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
    updateSelectedDateTrades(selectedDateTrades: Trade[]): void {
      dispatch(updateSelectedDateTrades(selectedDateTrades));
    },
    updateSelectedDateTradesErrors(selectedDateTradesErrors: {
      [key: string]: any;
    }): void {
      dispatch(updateSelectedDateTradesErrors(selectedDateTradesErrors));
    },
    updateDeleteJournalEntryModalOpen(
      deleteJournalEntryModalOpen: boolean,
    ): void {
      dispatch(updateDeleteJournalEntryModalOpen(deleteJournalEntryModalOpen));
    },
    updateDeleteJournalEntryErrors(deleteJournalEntryErrors: {
      [key: string]: any;
    }): void {
      dispatch(updateDeleteJournalEntryErrors(deleteJournalEntryErrors));
    },
    updateEditingJournalEntry(editingJournalEntry: boolean): void {
      dispatch(updateEditingJournalEntry(editingJournalEntry));
    },
  };
};

export default useJournalDispatch;
