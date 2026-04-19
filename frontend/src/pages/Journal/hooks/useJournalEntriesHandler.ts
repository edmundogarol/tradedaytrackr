import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { set } from "lodash";
import { useCallback } from "react";
import useJournalDispatch from "./useJournalDispatch";
import useJournalEntriesApiCall from "./useJournalEntriesApiCall";

interface JournalEntriesHandler {
  getJournalEntries: (pageNumber: number) => Promise<void>;
  loading: boolean;
}

const useJournalEntriesHandler = (): JournalEntriesHandler => {
  const { fetch, loading } = useJournalEntriesApiCall();
  const {
    updateJournalEntries,
    updateJournalEntriesItemCount,
    updateJournalEntriesNextPage,
    updateJournalEntriesPrevPage,
    updateJournalEntriesErrors,
  } = useJournalDispatch();

  return {
    getJournalEntries: useCallback(
      async (pageNumber: number) => {
        const options = {};
        if (pageNumber > 1) {
          set(
            options,
            "url",
            `${environmentConfig.HOST}/api/journal-entries/?page=${pageNumber}`,
          );
        }

        const { error, data } = await fetch(options);

        if (!!data) {
          updateJournalEntries(keysToCamel(data.results));
          updateJournalEntriesItemCount(data.count);
          updateJournalEntriesErrors({});
          updateJournalEntriesNextPage(data.next);
          updateJournalEntriesPrevPage(data.previous);
        } else if (error) {
          updateJournalEntriesErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useJournalEntriesHandler;
