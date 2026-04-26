import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { ReportData } from "../ReportsInterface";

interface GetReportApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useGetReportApiCall = (): AxiosFetchWrapperResponse<
  ReportData,
  GetReportApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    ReportData,
    GetReportApiCallErrors
  >(`reports/`, {
    method: "GET",
  });

  return { fetch, data, loading, error };
};

export default useGetReportApiCall;
