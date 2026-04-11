import type { Trade, TradingAccount } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { FundedAccountsAction } from "../FundedAccountsState";
import {
  updateAddTradeErrors,
  updateAddTradeModalOpen,
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
    updateSelectedTrade(trade: Trade): void {
      dispatch(updateSelectedTrade(trade));
    },
    updateAddTradeModalOpen(open: boolean): void {
      dispatch(updateAddTradeModalOpen(open));
    },
    updateAddTradeErrors(errors: { [key: string]: any }): void {
      dispatch(updateAddTradeErrors(errors));
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
