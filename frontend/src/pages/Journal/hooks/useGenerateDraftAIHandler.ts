import { isNotEmptyString } from "@utils/utils";
import { useCallback } from "react";
import useGenerateDraftAIApiCall from "./useGenerateDraftAIApiCall";
import useJournalDispatch from "./useJournalDispatch";
import useJournalState from "./useJournalState";

interface UseGenerateDraftAIHandlerProps {
  generateDraft: (tags: string[]) => Promise<void>;
  loading: boolean;
}

const useGenerateDraftAIHandler = (): UseGenerateDraftAIHandlerProps => {
  const { updateJournalEntry, updateJournalErrors } = useJournalDispatch();
  const { journalEntry } = useJournalState();
  const { fetch, loading } = useGenerateDraftAIApiCall();

  return {
    generateDraft: useCallback(
      async (tags: string[]) => {
        const { error, data } = await fetch({
          data: {
            tags,
          },
        });

        if (!data && !error) return;

        if (error) {
          console.log("Draft generation error", error);
          updateJournalErrors(
            error || {
              detail:
                "An error occurred while generating the draft. Please try again.",
            },
          );
          return;
        }

        if (!!data) {
          updateJournalEntry({
            ...journalEntry,
            description: data.description,
          });

          if (!isNotEmptyString(data.description)) {
            updateJournalErrors({
              detail:
                "No draft was generated. Please try again or try adding more tags.",
            });
            return;
          }
          updateJournalErrors({ detail: "Successfully generated draft" });
        }
      },
      [loading, journalEntry],
    ),
    loading,
  };
};

export default useGenerateDraftAIHandler;
