import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { ReportData } from "../ReportsInterface";

interface GetReportApiCallResponse {
  data: ReportData;
}

interface GetReportApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useGetReportApiCall = (): AxiosFetchWrapperResponse<
  GetReportApiCallResponse,
  GetReportApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    GetReportApiCallResponse,
    GetReportApiCallErrors
  >(`reports/`, {
    method: "GET",
  });

  return { fetch, data, loading, error };
};

export default useGetReportApiCall;
