import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import useDeleteJournalEntryApiCall from "./useDeleteJournalEntryApiCall";
import useJournalDispatch from "./useJournalDispatch";
import useJournalState from "./useJournalState";

interface DeleteJournalEntryHandler {
  deleteJournalEntry: (journalEntryId: number) => Promise<void>;
  loading: boolean;
}

const useDeleteJournalEntryHandler = (): DeleteJournalEntryHandler => {
  const { fetch, loading } = useDeleteJournalEntryApiCall();
  const {} = useJournalState();
  const { updateDeleteJournalEntryErrors, updateDeleteJournalEntryModalOpen } =
    useJournalDispatch();
  const navigation = useReactNavigation();

  return {
    deleteJournalEntry: useCallback(
      async (journalEntryId: number) => {
        const { error, data } = await fetch({
          url: `${environmentConfig.HOST}/api/journal-entries/${journalEntryId}/`,
        });

        if (!!data) {
          navigation.navigate(PageEnum.Journal);
          updateDeleteJournalEntryErrors(data);
          updateDeleteJournalEntryModalOpen(false);
        } else if (error) {
          if ((error as any)?.detail.includes("query")) {
            updateDeleteJournalEntryErrors({
              error:
                "Something went wrong while deleting the journal entry. Please try again.",
            });
            return;
          }
          updateDeleteJournalEntryErrors(error);
          updateDeleteJournalEntryModalOpen(false);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useDeleteJournalEntryHandler;
