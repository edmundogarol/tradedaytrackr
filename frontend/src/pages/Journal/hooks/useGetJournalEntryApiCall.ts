import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { JournalEntry } from "../JournalInterfaces";

const useGetJournalEntryApiCall =
  (): AxiosFetchWrapperResponse<JournalEntry> => {
    const { fetch, data, loading, error } = useAxiosFetch<JournalEntry>(
      "journal-entries/",
      {
        method: "GET",
      },
    );

    return { fetch, data, loading, error };
  };

export default useGetJournalEntryApiCall;
