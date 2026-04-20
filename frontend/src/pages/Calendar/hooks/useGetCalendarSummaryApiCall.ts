import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { CalendarSummary } from "@interfaces/CustomTypes";

interface GetCalendarSummaryApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useGetCalendarSummaryApiCall = (): AxiosFetchWrapperResponse<
  CalendarSummary,
  GetCalendarSummaryApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    CalendarSummary,
    GetCalendarSummaryApiCallErrors
  >(`calendar-summary/`, {
    method: "GET",
  });

  return { fetch, data, loading, error };
};

export default useGetCalendarSummaryApiCall;
