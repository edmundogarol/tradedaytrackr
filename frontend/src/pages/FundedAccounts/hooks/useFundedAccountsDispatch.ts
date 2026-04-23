import type {
  DashboardSummaries,
  EvaluationAccount,
  Trade,
  TradingAccount,
} from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { FundedAccountsAction } from "../FundedAccountsState";
import {
  updateAddTradeErrors,
  updateAddTradeModalOpen,
  updateArchivedTradingAccounts,
  updateArchivedTradingAccountsErrors,
  updateArchivedTradingAccountsItemCount,
  updateArchivedTradingAccountsNextPage,
  updateArchivingAccountModalOpen,
  updateBufferFilter,
  updateCreateTradingAccountErrors,
  updateCreateTradingAccountModalOpen,
  updateCurrentDayValuesPage,
  updateCurrentTradingAccount,
  updateCurrentTradingAccountErrors,
  updateDashboardSummaries,
  updateDeleteTradeErrors,
  updateDeleteTradeModalOpen,
  updateDeleteTradingAccountErrors,
  updateDeletingTradingAccountModalOpen,
  updateEditingFields,
  updateEvalFirmFilter,
  updateEvalStatusFilter,
  updateFirmFilter,
  updateSelectedDateJournalEntries,
  updateSelectedTrade,
  updateSelectedTradingAccount,
  updateTradingAccounts,
  updateTradingAccountsErrors,
} from "../FundedAccountsState";

interface FundedAccountsDispatch {
  updateTradingAccounts: (tradingAccounts: TradingAccount[]) => void;
  updateSelectedTradingAccount: (tradingAccount: TradingAccount) => void;
  updateCreateTradingAccountModalOpen: (open: boolean) => void;
  updateCreateTradingAccountErrors: (errors: { [key: string]: any }) => void;
  updateTradingAccountsErrors: (errors: { [key: string]: any }) => void;
  updateSelectedTrade: (trade: Trade) => void;
  updateAddTradeModalOpen: (open: boolean) => void;
  updateAddTradeErrors: (errors: { [key: string]: any }) => void;
  updateCurrentTradingAccount: (
    tradingAccount: TradingAccount | EvaluationAccount,
  ) => void;
  updateCurrentTradingAccountErrors: (errors: { [key: string]: any }) => void;
  updateEditingFields: (fields: {
    editingAccountBalance?: boolean;
    editingAccountName?: boolean;
    editingAccountTemplate?: boolean;
  }) => void;
  updateDeletingTradingAccountModalOpen: (open: boolean) => void;
  updateDeleteTradingAccountErrors: (errors: { [key: string]: any }) => void;
  updateFirmFilter: (filter: string[]) => void;
  updateBufferFilter: (filter: string[]) => void;
  updateSelectedDateJournalEntries: (journalEntries: any[]) => void;
  updateDeleteTradeModalOpen: (open: boolean) => void;
  updateDeleteTradeErrors: (errors: { [key: string]: any }) => void;
  updateEvalFirmFilter: (filter: string[]) => void;
  updateEvalStatusFilter: (filter: string[]) => void;
  updateArchivedTradingAccounts: (tradingAccounts: TradingAccount[]) => void;
  updateArchivedTradingAccountsErrors: (errors: { [key: string]: any }) => void;
  updateArchivedTradingAccountsNextPage: (nextPage: string | undefined) => void;
  updateArchivedTradingAccountsItemCount: (itemCount: number) => void;
  updateArchivingAccountModalOpen: (open: boolean) => void;
  updateDashboardSummaries: (summaries: DashboardSummaries) => void;
  updateCurrentDayValuesPage: (page: number) => void;
}

const useFundedAccountsDispatch = (): FundedAccountsDispatch => {
  const dispatch: Dispatch<FundedAccountsAction> = useDispatch();
  return {
    updateTradingAccounts(tradingAccounts: TradingAccount[]): void {
      dispatch(updateTradingAccounts(tradingAccounts));
    },
    updateSelectedTradingAccount(tradingAccount: TradingAccount): void {
      dispatch(updateSelectedTradingAccount(tradingAccount));
    },
    updateCreateTradingAccountModalOpen(open: boolean): void {
      dispatch(updateCreateTradingAccountModalOpen(open));
    },
    updateCreateTradingAccountErrors(errors: { [key: string]: any }): void {
      dispatch(updateCreateTradingAccountErrors(errors));
    },
    updateTradingAccountsErrors(errors: { [key: string]: any }): void {
      dispatch(updateTradingAccountsErrors(errors));
    },
    updateSelectedTrade(trade: Trade): void {
      dispatch(updateSelectedTrade(trade));
    },
    updateAddTradeModalOpen(open: boolean): void {
      dispatch(updateAddTradeModalOpen(open));
    },
    updateAddTradeErrors(errors: { [key: string]: any }): void {
      dispatch(updateAddTradeErrors(errors));
    },
    updateCurrentTradingAccount(
      tradingAccount: TradingAccount | EvaluationAccount,
    ): void {
      dispatch(updateCurrentTradingAccount(tradingAccount as any));
    },
    updateCurrentTradingAccountErrors(errors: { [key: string]: any }): void {
      dispatch(updateCurrentTradingAccountErrors(errors));
    },
    updateEditingFields(fields: {
      editingAccountBalance?: boolean;
      editingAccountName?: boolean;
      editingAccountTemplate?: boolean;
    }): void {
      dispatch(updateEditingFields(fields));
    },
    updateDeletingTradingAccountModalOpen(open: boolean): void {
      dispatch(updateDeletingTradingAccountModalOpen(open));
    },
    updateDeleteTradingAccountErrors(errors: { [key: string]: any }): void {
      dispatch(updateDeleteTradingAccountErrors(errors));
    },
    updateBufferFilter(filter: string[]): void {
      dispatch(updateBufferFilter(filter));
    },
    updateFirmFilter(filter: string[]): void {
      dispatch(updateFirmFilter(filter));
    },
    updateSelectedDateJournalEntries(journalEntries: any[]): void {
      dispatch(updateSelectedDateJournalEntries(journalEntries));
    },
    updateDeleteTradeModalOpen(open: boolean): void {
      dispatch(updateDeleteTradeModalOpen(open));
    },
    updateDeleteTradeErrors(errors: { [key: string]: any }): void {
      dispatch(updateDeleteTradeErrors(errors));
    },
    updateEvalFirmFilter(filter: string[]): void {
      dispatch(updateEvalFirmFilter(filter));
    },
    updateEvalStatusFilter(filter: string[]): void {
      dispatch(updateEvalStatusFilter(filter));
    },
    updateArchivedTradingAccounts(tradingAccounts: TradingAccount[]): void {
      dispatch(updateArchivedTradingAccounts(tradingAccounts));
    },
    updateArchivedTradingAccountsErrors(errors: { [key: string]: any }): void {
      dispatch(updateArchivedTradingAccountsErrors(errors));
    },
    updateArchivedTradingAccountsNextPage(nextPage: string | undefined): void {
      dispatch(updateArchivedTradingAccountsNextPage(nextPage));
    },
    updateArchivedTradingAccountsItemCount(itemCount: number): void {
      dispatch(updateArchivedTradingAccountsItemCount(itemCount));
    },
    updateArchivingAccountModalOpen(open: boolean): void {
      dispatch(updateArchivingAccountModalOpen(open));
    },
    updateDashboardSummaries(summaries: DashboardSummaries): void {
      dispatch(updateDashboardSummaries(summaries));
    },
    updateCurrentDayValuesPage(page: number): void {
      dispatch(updateCurrentDayValuesPage(page));
    },
  };
};

export default useFundedAccountsDispatch;
