import environmentConfig from "@utils/environmentConfig";
import { set } from "lodash";
import { useCallback } from "react";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useFundedAccountsState from "./useFundedAccountsState";
import useGetTradingDaysApiCall from "./useGetTradingDaysApiCall";

interface GetTradingDaysHandler {
  getTradingDays: (page: number) => Promise<void>;
  loading: boolean;
}

const useGetTradingDaysHandler = (): GetTradingDaysHandler => {
  const { fetch, loading } = useGetTradingDaysApiCall();
  const { currentTradingAccount } = useFundedAccountsState();
  const { updateCurrentTradingAccount, updateCurrentTradingAccountErrors } =
    useFundedAccountsDispatch();
  return {
    getTradingDays: useCallback(
      async (page: number) => {
        const options = {};
        if (page > 1 && currentTradingAccount.dayValuesNextPage) {
          set(
            options,
            "url",
            `${environmentConfig.HOST}/api/trading-days/?account_id=${currentTradingAccount.id}&page=${page}`,
          );
        }

        const { error, data } = await fetch(options);

        console.log({ currentTradingAccount });
        if (!!data) {
          updateCurrentTradingAccount({
            ...currentTradingAccount,
            dayValues: data.results,
            dayValuesNextPage: data?.next || "",
            dayValuesCount: data.count,
          });
        } else if (error) {
          updateCurrentTradingAccountErrors(error);
        }
      },
      [loading, currentTradingAccount],
    ),
    loading,
  };
};

export default useGetTradingDaysHandler;
