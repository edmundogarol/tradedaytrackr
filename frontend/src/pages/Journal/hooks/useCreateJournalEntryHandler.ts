import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { appendIfDefined, keysToCamel, resizeImage } from "@utils/utils";
import { useCallback } from "react";
import type { JournalEntry } from "../JournalInterfaces";
import useCreateJournalEntryApiCall from "./useCreateJournalEntryApiCall";
import useJournalDispatch from "./useJournalDispatch";
import useJournalState from "./useJournalState";

interface CreateJournalEntryHandler {
  createJournalEntry: (
    journalEntry: JournalEntry,
    journalEntryImage: File | string | null,
  ) => Promise<void>;
  loading: boolean;
}

const useCreateJournalEntryHandler = (): CreateJournalEntryHandler => {
  const { fetch, loading } = useCreateJournalEntryApiCall();
  const { journalEntry, fundedView } = useJournalState();
  const { updateJournalEntry, updateJournalErrors, updateEditingJournalEntry } =
    useJournalDispatch();
  const navigation = useReactNavigation();

  return {
    createJournalEntry: useCallback(
      async (
        journalEntry: JournalEntry,
        journalEntryImage: File | string | null,
      ) => {
        const formData = new FormData();

        appendIfDefined(formData, "date_time", journalEntry.dateTime);
        appendIfDefined(formData, "risk", journalEntry.risk);
        appendIfDefined(formData, "contracts", journalEntry.contracts);
        appendIfDefined(formData, "outcome", journalEntry.outcome);
        appendIfDefined(formData, "eval_risk", journalEntry.evalRisk);
        appendIfDefined(formData, "eval_contracts", journalEntry.evalContracts);
        appendIfDefined(formData, "eval_outcome", journalEntry.evalOutcome);
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
        (journalEntry.evalTradeIds || []).forEach((id) => {
          formData.append("trade_ids_input", String(id));
        });

        const { error, data } = await fetch({
          data: formData,
        });

        if (!!data && data.id) {
          updateJournalEntry(keysToCamel(data));
          navigation.navigate(PageEnum.Journal);
          updateJournalErrors({
            detail: "Journal entry created successfully!",
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

export default useCreateJournalEntryHandler;
