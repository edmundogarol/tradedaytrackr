import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { set } from "lodash";
import { useCallback } from "react";
import useGetPayoutsApiCall from "./useGetPayoutsApiCall";
import usePayoutsDispatch from "./usePayoutsDispatch";

interface GetPayoutsHandler {
  getPayouts: (pageNumber: number) => Promise<void>;
  loading: boolean;
}

const useGetPayoutsHandler = (): GetPayoutsHandler => {
  const { fetch, loading } = useGetPayoutsApiCall();
  const {
    updatePayouts,
    updatePayoutsErrors,
    updateItemsCount,
    updateNextPage,
  } = usePayoutsDispatch();
  return {
    getPayouts: useCallback(
      async (pageNumber: number) => {
        const options = {};
        if (pageNumber > 1) {
          set(
            options,
            "url",
            `${environmentConfig.HOST}/api/payouts/list/?page=${pageNumber}`,
          );
        }

        const { error, data } = await fetch(options);

        if (!!data) {
          updatePayouts(keysToCamel(data.results));
          updateItemsCount(data.count);
          updatePayoutsErrors({});
          updateNextPage(data.next);
        } else if (error) {
          updatePayoutsErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useGetPayoutsHandler;
