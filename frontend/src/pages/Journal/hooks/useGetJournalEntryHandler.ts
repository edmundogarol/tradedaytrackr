import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useGenerateDraftAIApiCall from "./useGenerateDraftAIApiCall";
import useJournalDispatch from "./useJournalDispatch";
import useJournalState from "./useJournalState";

interface GetJournalEntryHandlerProps {
  getJournalEntry: (id: number) => Promise<void>;
  loading: boolean;
}

const useGetJournalEntryHandler = (): GetJournalEntryHandlerProps => {
  const { updateJournalEntry, updateJournalErrors } = useJournalDispatch();
  const { journalEntry } = useJournalState();
  const { fetch, loading } = useGenerateDraftAIApiCall();

  return {
    getJournalEntry: useCallback(
      async (id: number) => {
        const { error, data } = await fetch({
          url: `${environmentConfig.HOST}/api/journal-entries/${id}/`,
          method: "GET",
        });

        if (!data && !error) return;

        if (error) {
          console.log("Get journal entry error", error);
          updateJournalErrors(
            error || {
              detail:
                "An error occurred while fetching the journal entry. Please try again.",
            },
          );
          return;
        }

        if (!!data) {
          updateJournalEntry({
            ...journalEntry,
            ...keysToCamel(data),
          });
        }
      },
      [loading, journalEntry],
    ),
    loading,
  };
};

export default useGetJournalEntryHandler;
