import environmentConfig from "@utils/environmentConfig";
import { appendIfDefined, resizeImage } from "@utils/utils";
import { useCallback } from "react";
import type { JournalEntry } from "../JournalInterfaces";
import useJournalDispatch from "./useJournalDispatch";
import useJournalState from "./useJournalState";
import useUpdateJournalEntryApiCall from "./useUpdateJournalEntryApiCall";

interface UpdateJournalEntryHandler {
  updateJournalEntry: (
    journalEntry: JournalEntry,
    journalEntryImage: File | string | null,
  ) => Promise<void>;
  loading: boolean;
}

const useUpdateJournalEntryHandler = (): UpdateJournalEntryHandler => {
  const { fetch, loading } = useUpdateJournalEntryApiCall();
  const { journalEntry } = useJournalState();
  const { updateJournalEntry, updateJournalErrors, updateEditingJournalEntry } =
    useJournalDispatch();

  return {
    updateJournalEntry: useCallback(
      async (
        journalEntry: JournalEntry,
        journalEntryImage: File | string | null,
      ) => {
        console.log({ journalEntry, journalEntryImage });
        const formData = new FormData();

        appendIfDefined(formData, "date_time", journalEntry.dateTime);
        appendIfDefined(formData, "risk", journalEntry.risk);
        appendIfDefined(formData, "contracts", journalEntry.contracts);
        appendIfDefined(formData, "outcome", journalEntry.outcome);
        appendIfDefined(formData, "instrument", journalEntry.instrument);
        appendIfDefined(formData, "description", journalEntry.description);
        if (journalEntryImage) {
          if (journalEntryImage instanceof File) {
            const resized = await resizeImage(journalEntryImage, 800);
            formData.append("image", resized);
          }
        }
        journalEntry.tags.forEach((tag) => {
          formData.append("tags", tag.name);
        });
        journalEntry.tradeIds.forEach((id) => {
          formData.append("trade_ids_input", String(id));
        });

        const { error, data } = await fetch({
          url: `${environmentConfig.HOST}/api/journal-entries/${journalEntry.id}/`,
          data: formData,
        });

        if (!!data && data.id) {
          updateJournalEntry(data);
          updateJournalErrors({
            detail: "Journal entry updated successfully!",
          });
          updateEditingJournalEntry(false);
        } else if (error) {
          updateJournalErrors(error);
        }
      },
      [loading, journalEntry],
    ),
    loading,
  };
};

export default useUpdateJournalEntryHandler;
