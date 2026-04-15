import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { m } from "@utils/utils";
import { useCallback } from "react";
import type { JournalEntry } from "../JournalInterfaces";
import { initialState } from "../JournalState";
import useCreateJournalEntryApiCall from "./useCreateJournalEntryApiCall";
import useJournalDispatch from "./useJournalDispatch";
import useJournalState from "./useJournalState";

interface CreateJournalEntryHandler {
  createJournalEntry: (journalEntry: JournalEntry) => Promise<void>;
  loading: boolean;
}

const useCreateJournalEntryHandler = (): CreateJournalEntryHandler => {
  const { fetch, loading } = useCreateJournalEntryApiCall();
  const {} = useJournalState();
  const { updateJournalEntry, updateJournalErrors } = useJournalDispatch();
  const navigation = useReactNavigation();

  return {
    createJournalEntry: useCallback(
      async (journalEntry: JournalEntry) => {
        const { error, data } = await fetch({
          data: {
            ...journalEntry,
            trade_ids_input: journalEntry.tradeIds,
            tags: journalEntry.tags.map((tag) => tag.name),
            date_time: m(journalEntry.dateTime).format("YYYY-MM-DDTHH:mm:ssZ"),
          },
        });

        if (!!data && data.id) {
          updateJournalEntry(initialState.journalEntry);
          navigation.navigate(PageEnum.JournalEntry, { id: data.id });
          updateJournalErrors({
            detail: "Journal entry created successfully!",
          });
        } else if (error) {
          updateJournalErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useCreateJournalEntryHandler;
