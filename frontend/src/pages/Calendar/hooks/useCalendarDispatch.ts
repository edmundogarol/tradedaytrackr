import type { CalendarSummary } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { CalendarAction } from "../CalendarState";
import {
  updateCalendarSummary,
  updateCalendarSummaryErrors,
} from "../CalendarState";

interface CalendarDispatch {
  updateCalendarSummary(summary: CalendarSummary): void;
  updateCalendarSummaryErrors(errors: { [key: string]: any }): void;
}

export const useCalendarDispatch = (): CalendarDispatch => {
  const dispatch: Dispatch<CalendarAction> = useDispatch();
  return {
    updateCalendarSummary: (summary: CalendarSummary): void => {
      dispatch(updateCalendarSummary(summary));
    },
    updateCalendarSummaryErrors: (errors: { [key: string]: any }): void => {
      dispatch(updateCalendarSummaryErrors(errors));
    },
  };
};

export default useCalendarDispatch;
