import type { TradingAccount, TradingDay } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { FundedAccountsAction } from "../FundedAccountsState";
import {
  updateAddTradingDayErrors,
  updateAddTradingDayModalOpen,
  updateBufferFilter,
  updateCreateTradingAccountErrors,
  updateCreateTradingAccountModalOpen,
  updateCurrentTradingAccount,
  updateCurrentTradingAccountErrors,
  updateDeleteTradingAccountErrors,
  updateDeletingTradingAccountModalOpen,
  updateEditingFields,
  updateFirmFilter,
  updateSelectedDateJournalEntries,
  updateSelectedTradingAccount,
  updateSelectedTradingDay,
  updateTradingAccounts,
  updateTradingAccountsErrors,
} from "../FundedAccountsState";

interface FundedAccountsDispatch {
  updateTradingAccounts: (tradingAccounts: TradingAccount[]) => void;
  updateSelectedTradingAccount: (tradingAccount: TradingAccount) => void;
  updateCreateTradingAccountModalOpen: (open: boolean) => void;
  updateCreateTradingAccountErrors: (errors: { [key: string]: any }) => void;
  updateTradingAccountsErrors: (errors: { [key: string]: any }) => void;
  updateSelectedTradingDay: (tradingDay: TradingDay | null) => void;
  updateAddTradingDayModalOpen: (open: boolean) => void;
  updateAddTradingDayErrors: (errors: { [key: string]: any }) => void;
  updateCurrentTradingAccount: (tradingAccount: TradingAccount) => void;
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
    updateSelectedTradingDay(tradingDay: TradingDay | null): void {
      dispatch(updateSelectedTradingDay(tradingDay));
    },
    updateAddTradingDayModalOpen(open: boolean): void {
      dispatch(updateAddTradingDayModalOpen(open));
    },
    updateAddTradingDayErrors(errors: { [key: string]: any }): void {
      dispatch(updateAddTradingDayErrors(errors));
    },
    updateCurrentTradingAccount(tradingAccount: TradingAccount): void {
      dispatch(updateCurrentTradingAccount(tradingAccount));
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
  };
};

export default useFundedAccountsDispatch;
