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
  updateFundedView,
  updateJournalEntries,
  updateJournalEntriesCurrentPage,
  updateJournalEntriesErrors,
  updateJournalEntriesItemCount,
  updateJournalEntriesNextPage,
  updateJournalEntriesPrevPage,
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
  updateFundedView(fundedView: boolean): void;
  updateJournalEntriesCurrentPage(journalEntriesCurrentPage: number): void;
  updateJournalEntriesItemCount(journalEntriesItemCount: number): void;
  updateJournalEntriesNextPage(journalEntriesNextPage: string | null): void;
  updateJournalEntriesPrevPage(journalEntriesPrevPage: string | null): void;
  updateJournalEntriesErrors(journalEntriesErrors: {
    [key: string]: any;
  }): void;
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
    updateFundedView(fundedView: boolean): void {
      dispatch(updateFundedView(fundedView));
    },
    updateJournalEntriesCurrentPage(journalEntriesCurrentPage: number): void {
      dispatch(updateJournalEntriesCurrentPage(journalEntriesCurrentPage));
    },
    updateJournalEntriesItemCount(journalEntriesItemCount: number): void {
      dispatch(updateJournalEntriesItemCount(journalEntriesItemCount));
    },
    updateJournalEntriesNextPage(journalEntriesNextPage: string | null): void {
      dispatch(updateJournalEntriesNextPage(journalEntriesNextPage));
    },
    updateJournalEntriesPrevPage(journalEntriesPrevPage: string | null): void {
      dispatch(updateJournalEntriesPrevPage(journalEntriesPrevPage));
    },
    updateJournalEntriesErrors(journalEntriesErrors: {
      [key: string]: any;
    }): void {
      dispatch(updateJournalEntriesErrors(journalEntriesErrors));
    },
  };
};

export default useJournalDispatch;
