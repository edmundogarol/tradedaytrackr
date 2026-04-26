import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useGetReportApiCall from "./useGetReportApiCallApiCall";
import { useReportsDispatch } from "./useReportsDispatch";
import useReportsState from "./useReportsState";

interface GetReportHandler {
  getReport: () => Promise<void>;
  loading: boolean;
}

const useGetReportHandler = (): GetReportHandler => {
  const { fetch, loading } = useGetReportApiCall();
  const {
    reportDataStartDate: start,
    reportDataEndDate: end,
    reportDataType: type,
  } = useReportsState();
  const { updateReportData, updateReportDataErrors } = useReportsDispatch();

  return {
    getReport: useCallback(async () => {
      const { error, data } = await fetch({
        url: `${environmentConfig.HOST}/api/reports/?start=${start}&end=${end}&type=${type}`,
      });

      if (!!data) {
        updateReportData(keysToCamel(data));
      } else if (error) {
        updateReportDataErrors(error);
      }
    }, [loading, start, end, type]),
    loading,
  };
};

export default useGetReportHandler;
