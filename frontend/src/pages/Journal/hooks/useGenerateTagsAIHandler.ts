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
          updateJournalErrors(error);
          return;
        }

        if (!!data) {
          updateJournalEntry({
            ...journalEntry,
            tags: data.tags,
          });
          updateJournalErrors({});
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useGenerateTagsAIHandler;
