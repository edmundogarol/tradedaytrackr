import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { JournalEntry } from "../JournalInterfaces";

interface CreateJournalEntryApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useCreateJournalEntryApiCall = (): AxiosFetchWrapperResponse<
  JournalEntry,
  CreateJournalEntryApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    JournalEntry,
    CreateJournalEntryApiCallErrors
  >(`journal-entries/`, {
    method: "POST",
  });

  return { fetch, data, loading, error };
};

export default useCreateJournalEntryApiCall;
