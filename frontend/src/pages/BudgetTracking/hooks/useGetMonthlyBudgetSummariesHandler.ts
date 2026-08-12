import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useBudgetTrackingDispatch from "./useBudgetTrackingDispatch";
import useGetMonthlyBudgetSummariesApiCall from "./useGetMonthlyBudgetSummariesApiCall";

interface GetMonthlyBudgetSummariesHandler {
  getMonthlyBudgetSummaries: () => Promise<void>;
  loading: boolean;
}

const useGetMonthlyBudgetSummariesHandler =
  (): GetMonthlyBudgetSummariesHandler => {
    const { fetch, loading } = useGetMonthlyBudgetSummariesApiCall();
    const { updateMonthlySummaries, updateMonthlySummariesErrors } =
      useBudgetTrackingDispatch();
    return {
      getMonthlyBudgetSummaries: useCallback(async () => {
        const { error, data } = await fetch();

        if (!!data) {
          updateMonthlySummaries(keysToCamel(data.results));
          updateMonthlySummariesErrors({});
        } else if (error) {
          updateMonthlySummariesErrors(error);
        }
      }, [loading]),
      loading,
    };
  };

export default useGetMonthlyBudgetSummariesHandler;
