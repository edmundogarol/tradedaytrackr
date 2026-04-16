import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { JournalEntry } from "../JournalInterfaces";

interface UpdateJournalEntryApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useUpdateJournalEntryApiCall = (): AxiosFetchWrapperResponse<
  JournalEntry,
  UpdateJournalEntryApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    JournalEntry,
    UpdateJournalEntryApiCallErrors
  >(`journal-entries/`, {
    method: "PATCH",
  });

  return { fetch, data, loading, error };
};

export default useUpdateJournalEntryApiCall;
