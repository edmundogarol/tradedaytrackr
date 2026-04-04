import { uniq } from "lodash";
import { useCallback } from "react";
import useGenerateTagsAIApiCall from "./useGenerateTagsAIApiCall";
import useJournalDispatch from "./useJournalDispatch";
import useJournalState from "./useJournalState";

interface UseDemoUserLoginHandlerProps {
  generateTags: (description: string) => Promise<void>;
  loading: boolean;
}

const useGenerateTagsAIHandler = (): UseDemoUserLoginHandlerProps => {
  const { updateJournalEntry, updateJournalErrors } = useJournalDispatch();
  const { journalEntry } = useJournalState();
  const { fetch, loading } = useGenerateTagsAIApiCall();

  return {
    generateTags: useCallback(
      async (description: string) => {
        const { error, data } = await fetch({
          data: {
            description,
          },
        });

        if (!data && !error) return;

        if (error) {
          console.log("Tag generation error", error);
          updateJournalErrors(
            error || {
              detail:
                "An error occurred while generating tags. Please try again.",
            },
          );
          return;
        }

        if (!!data) {
          const noDuplicateTags = uniq([...journalEntry.tags, ...data.tags]);
          updateJournalEntry({
            ...journalEntry,
            tags: noDuplicateTags,
          });

          if (data.tags.length === 0) {
            updateJournalErrors({
              detail:
                "No tags were generated. Please try again or try adding more description.",
            });
            return;
          }
          updateJournalErrors({ detail: "Successfully generated tags" });
        }
      },
      [loading, journalEntry],
    ),
    loading,
  };
};

export default useGenerateTagsAIHandler;
