import type { CalendarSummary } from "@interfaces/CustomTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CalendarState {
  readonly calendarSummary: CalendarSummary;
  readonly calendarSummaryErrors: {
    [key: string]: string;
  };
}

export const initialState: CalendarState = {
  calendarSummary: {
    daily: [],
    weekly: [],
    monthlyTotal: 0,
    evalMonthlyTotal: 0,
  },
  calendarSummaryErrors: {},
};

type UpdateCalendarSummaryAction = PayloadAction<CalendarSummary>;
type UpdateCalendarSummaryErrorsAction = PayloadAction<{
  [key: string]: any;
}>;

export type CalendarAction =
  | UpdateCalendarSummaryAction
  | UpdateCalendarSummaryErrorsAction;

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    updateCalendarSummary: (state, action: UpdateCalendarSummaryAction) => {
      state.calendarSummary = action.payload;
    },
    updateCalendarSummaryErrors: (
      state,
      action: UpdateCalendarSummaryErrorsAction,
    ) => {
      state.calendarSummaryErrors = action.payload;
    },
  },
});

export const { updateCalendarSummary, updateCalendarSummaryErrors } =
  calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;

export default calendarSlice.reducer;
