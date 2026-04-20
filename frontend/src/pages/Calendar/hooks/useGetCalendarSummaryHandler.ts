import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useCalendarDispatch from "./useCalendarDispatch";
import useGetCalendarSummaryApiCall from "./useGetCalendarSummaryApiCall";

interface GetCalendarSummaryHandler {
  getCalendarSummary: () => Promise<void>;
  loading: boolean;
}

const useGetCalendarSummaryHandler = (): GetCalendarSummaryHandler => {
  const { fetch, loading } = useGetCalendarSummaryApiCall();
  const { updateCalendarSummary, updateCalendarSummaryErrors } =
    useCalendarDispatch();

  return {
    getCalendarSummary: useCallback(async () => {
      const { error, data } = await fetch();

      if (!!data) {
        updateCalendarSummary(keysToCamel(data));
      } else if (error) {
        updateCalendarSummaryErrors(error);
      }
    }, [loading]),
    loading,
  };
};

export default useGetCalendarSummaryHandler;
