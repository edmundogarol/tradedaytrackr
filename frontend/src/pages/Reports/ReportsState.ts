import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export enum ReportDataType {
  JournalEntry = "journalEntry",
  Trade = "trade",
  FundedAccount = "fundedAccount",
  EvaluationAccount = "evaluationAccount",
}

export interface ReportsState {
  readonly reportData: any;
  readonly reportDataErrors: {
    [key: string]: any;
  };
  readonly reportDataStartDate: string | null;
  readonly reportDataEndDate: string | null;
  readonly reportDataType: ReportDataType | null;
}

export const initialState: ReportsState = {
  reportData: [],
  reportDataErrors: {},
  reportDataStartDate: null,
  reportDataEndDate: null,
  reportDataType: null,
};

export type UpdateReportDataAction = PayloadAction<{
  data: any;
  start: string;
  end: string;
  type: ReportDataType;
}>;

export type UpdateReportDataErrorsAction = PayloadAction<{
  errors: { [key: string]: any };
}>;

export type ReportsAction =
  | UpdateReportDataAction
  | UpdateReportDataErrorsAction;

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    updateReportData: (state, action: UpdateReportDataAction) => {
      state.reportData = action.payload.data;
      state.reportDataStartDate = action.payload.start;
      state.reportDataEndDate = action.payload.end;
      state.reportDataType = action.payload.type;
    },
    updateReportDataErrors: (state, action: UpdateReportDataErrorsAction) => {
      state.reportDataErrors = action.payload.errors;
    },
  },
});

export const { updateReportData, updateReportDataErrors } =
  reportsSlice.actions;
export const reportsReducer = reportsSlice.reducer;

export default reportsSlice.reducer;
