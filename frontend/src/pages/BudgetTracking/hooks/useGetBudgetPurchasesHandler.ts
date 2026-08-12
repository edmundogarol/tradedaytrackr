import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { set } from "lodash";
import { useCallback } from "react";
import useBudgetTrackingDispatch from "./useBudgetTrackingDispatch";
import useGetBudgetPurchasesApiCall from "./useGetBudgetPurchasesApiCall";

interface GetBudgetPurchasesHandler {
  getBudgetPurchases: (pageNumber: number) => Promise<void>;
  loading: boolean;
}

const useGetBudgetPurchasesHandler = (): GetBudgetPurchasesHandler => {
  const { fetch, loading } = useGetBudgetPurchasesApiCall();
  const {
    updatePurchases,
    updatePurchasesErrors,
    updateItemsCount,
    updateNextPage,
  } = useBudgetTrackingDispatch();
  return {
    getBudgetPurchases: useCallback(
      async (pageNumber: number) => {
        const options = {};
        if (pageNumber > 1) {
          set(
            options,
            "url",
            `${environmentConfig.HOST}/api/budget-purchases/?page=${pageNumber}`,
          );
        }

        const { error, data } = await fetch(options);

        if (!!data) {
          updatePurchases(keysToCamel(data.results));
          updateItemsCount(data.count);
          updatePurchasesErrors({});
          updateNextPage(data.next);
        } else if (error) {
          updatePurchasesErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useGetBudgetPurchasesHandler;
