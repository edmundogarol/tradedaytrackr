import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useGetDashboardSummariesApiCall from "./useGetDashboardSummariesApiCall";

interface GetDashboardSummariesHandler {
  getDashboardSummaries: () => Promise<void>;
  loading: boolean;
}

const useGetDashboardSummariesHandler = (): GetDashboardSummariesHandler => {
  const { fetch, loading } = useGetDashboardSummariesApiCall();
  const { updateDashboardSummaries } = useFundedAccountsDispatch();
  const { updateSystemAlert } = useSettingsDispatch();
  return {
    getDashboardSummaries: useCallback(async () => {
      const { error, data } = await fetch();

      if (!!data) {
        updateDashboardSummaries(keysToCamel(data));
      } else if (error) {
        updateSystemAlert(error);
      }
    }, [loading]),
    loading,
  };
};

export default useGetDashboardSummariesHandler;
