import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { set } from "lodash";
import { useCallback } from "react";
import useGetMonthlyPayoutSummariesApiCall from "./useGetMonthlyPayoutSummariesApiCall";
import usePayoutsDispatch from "./usePayoutsDispatch";

interface GetMonthlyPayoutSummariesHandler {
  getMonthlyPayoutSummaries: (pageNumber: number) => Promise<void>;
  loading: boolean;
}

const useGetMonthlyPayoutSummariesHandler =
  (): GetMonthlyPayoutSummariesHandler => {
    const { fetch, loading } = useGetMonthlyPayoutSummariesApiCall();
    const {
      updateMonthlySummaries,
      updateMonthlySummariesErrors,
      updateMonthlySummariesNextPage,
      updateMonthlySummariesPrevPage,
    } = usePayoutsDispatch();
    return {
      getMonthlyPayoutSummaries: useCallback(
        async (pageNumber: number) => {
          const options = {};
          if (pageNumber > 1) {
            set(
              options,
              "url",
              `${environmentConfig.HOST}/api/monthly-payout-summaries/?page=${pageNumber}`,
            );
          }

          const { error, data } = await fetch(options);

          if (!!data) {
            updateMonthlySummaries(keysToCamel(data.results));
            updateMonthlySummariesErrors({});
            updateMonthlySummariesNextPage(data.next);
            updateMonthlySummariesPrevPage(data.previous);
          } else if (error) {
            updateMonthlySummariesErrors(error);
          }
        },
        [loading],
      ),
      loading,
    };
  };

export default useGetMonthlyPayoutSummariesHandler;
