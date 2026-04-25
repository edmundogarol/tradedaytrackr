import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { ReportDataType } from "../ReportsState";
import {
  updateReportData,
  updateReportDataErrors,
  type ReportsAction,
} from "../ReportsState";

interface ReportsDispatch {
  updateReportData: ({
    data,
    start,
    end,
    type,
  }: {
    data: any;
    start: string;
    end: string;
    type: ReportDataType;
  }) => void;
  updateReportDataErrors: (errors: { [key: string]: any }) => void;
}

export const useReportsDispatch = (): ReportsDispatch => {
  const dispatch: Dispatch<ReportsAction> = useDispatch();
  return {
    updateReportData: ({
      data,
      start,
      end,
      type,
    }: {
      data: any;
      start: string;
      end: string;
      type: ReportDataType;
    }): void => {
      dispatch(updateReportData({ data, start, end, type }));
    },
    updateReportDataErrors: (errors: { [key: string]: any }): void => {
      dispatch(updateReportDataErrors({ errors }));
    },
  };
};

export default useReportsDispatch;
