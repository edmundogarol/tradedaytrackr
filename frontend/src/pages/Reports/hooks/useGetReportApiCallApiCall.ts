import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type {
  EvaluationAccount,
  Trade,
  TradingAccount,
} from "@interfaces/CustomTypes";
import type { JournalEntry } from "@pages/Journal/JournalInterfaces";

type GetReportApiCallData =
  | JournalEntry[]
  | Trade[]
  | TradingAccount[]
  | EvaluationAccount[];

interface GetReportApiCallResponse {
  data: GetReportApiCallData;
  start: string;
  end: string;
  type: string;
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
  >(`report/`, {
    method: "GET",
  });

  return { fetch, data, loading, error };
};

export default useGetReportApiCall;
