import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { JournalEntry } from "../JournalInterfaces";

export interface JournalEntriesApiCallResponse {
  results: JournalEntry[];
  count: number;
  next: string | null;
  previous: string | null;
}

const useJournalEntriesApiCall =
  (): AxiosFetchWrapperResponse<JournalEntriesApiCallResponse> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<JournalEntriesApiCallResponse>("journal-entries/");

    return { fetch, data, loading, error };
  };

export default useJournalEntriesApiCall;
