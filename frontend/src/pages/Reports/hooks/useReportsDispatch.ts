import type { RangeType } from "@components/DateFilter/DateFilter";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import type { ReportData } from "../ReportsInterface";
import type { ReportDataType } from "../ReportsState";
import {
  updateReportCoverage,
  updateReportData,
  updateReportDataErrors,
  updateReportSelectedRangeType,
  type ReportsAction,
} from "../ReportsState";

interface ReportsDispatch {
  updateReportData: (data: ReportData) => void;
  updateReportCoverage: ({
    start,
    end,
    type,
  }: {
    start: string;
    end: string;
    type: ReportDataType;
  }) => void;
  updateReportDataErrors: (errors: { [key: string]: any }) => void;
  updateReportSelectedRangeType?: (rangeType: RangeType) => void;
}

export const useReportsDispatch = (): ReportsDispatch => {
  const dispatch: Dispatch<ReportsAction> = useDispatch();
  return {
    updateReportData: (data: ReportData): void => {
      dispatch(updateReportData(data));
    },
    updateReportCoverage: ({
      start,
      end,
      type,
    }: {
      start: string;
      end: string;
      type: ReportDataType;
    }): void => {
      dispatch(updateReportCoverage({ start, end, type }));
    },
    updateReportDataErrors: (errors: { [key: string]: any }): void => {
      dispatch(updateReportDataErrors({ errors }));
    },
    updateReportSelectedRangeType: (rangeType: RangeType): void => {
      dispatch(updateReportSelectedRangeType(rangeType));
    },
  };
};

export default useReportsDispatch;
