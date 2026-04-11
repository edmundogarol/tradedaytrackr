import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useGetJournalEntryByDateApiCall from "./useGetJournalEntryByDateApiCall";

interface GetJournalEntryByDateHandler {
  getJournalEntriesByDate: (date: string) => Promise<void>;
  loading: boolean;
}

const useGetJournalEntryByDateHandler = (): GetJournalEntryByDateHandler => {
  const { fetch, loading } = useGetJournalEntryByDateApiCall();
  const { updateSelectedDateJournalEntries } = useFundedAccountsDispatch();

  return {
    getJournalEntriesByDate: useCallback(
      async (date: string) => {
        const { error, data } = await fetch({
          method: "GET",
          url: `${environmentConfig.HOST}/api/journal-entries/by-date/?date=${date}`,
        });

        if (!!data) {
          const entries = keysToCamel(data);
          updateSelectedDateJournalEntries(
            entries instanceof Array ? entries : [entries],
          );
        } else if (error) {
          console.warn(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useGetJournalEntryByDateHandler;
