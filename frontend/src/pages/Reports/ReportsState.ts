import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import type { ReportData } from "./ReportsInterface";

export enum ReportDataType {
  JournalEntry = "journalEntry",
  Trade = "trade",
  FundedAccount = "fundedAccount",
  EvaluationAccount = "evaluationAccount",
}

export interface ReportsState {
  readonly reportData: ReportData;
  readonly reportDataErrors: {
    [key: string]: any;
  };
  readonly reportDataStartDate: string | null;
  readonly reportDataEndDate: string | null;
  readonly reportDataType: ReportDataType | null;
}

export const initialState: ReportsState = {
  reportData: {
    equityCurve: [],
    keyStats: {
      bestTrade: 0,
      worstTrade: 0,
      maxConsecutiveWins: 0,
      maxConsecutiveLosses: 0,
      avgTradeDurationSeconds: null,
    },
    overview: {
      totalPnl: 0,
      winRate: 0,
      totalTrades: 0,
      profitFactor: 0,
      expectancy: 0,
      avgWin: 0,
      avgLoss: 0,
    },
    pnlDistribution: {
      bigWins: 0,
      smallWins: 0,
      smallLosses: 0,
      bigLosses: 0,
    },
    performanceByDay: [],
    riskManagement: {
      maxDrawdown: 0,
      recoveryFactor: 0,
    },
    tags: [],
    recentTrades: [],
  },
  reportDataErrors: {},
  reportDataStartDate: moment().subtract(3, "day").format("YYYY-MM-DD"),
  reportDataEndDate: moment().format("YYYY-MM-DD"),
  reportDataType: ReportDataType.Trade,
};

export type UpdateReportDataAction = PayloadAction<ReportData>;
export type UpdateReportCoverageAction = PayloadAction<{
  start: string;
  end: string;
  type: ReportDataType;
}>;
export type UpdateReportDataErrorsAction = PayloadAction<{
  errors: { [key: string]: any };
}>;

export type ReportsAction =
  | UpdateReportDataAction
  | UpdateReportCoverageAction
  | UpdateReportDataErrorsAction;

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    updateReportData: (state, action: UpdateReportDataAction) => {
      state.reportData = action.payload;
    },
    updateReportCoverage: (state, action: UpdateReportCoverageAction) => {
      const { start, end, type } = action.payload;
      state.reportDataStartDate = start;
      state.reportDataEndDate = end;
      state.reportDataType = type;
    },
    updateReportDataErrors: (state, action: UpdateReportDataErrorsAction) => {
      state.reportDataErrors = action.payload.errors;
    },
  },
});

export const {
  updateReportData,
  updateReportCoverage,
  updateReportDataErrors,
} = reportsSlice.actions;
export const reportsReducer = reportsSlice.reducer;

export default reportsSlice.reducer;
