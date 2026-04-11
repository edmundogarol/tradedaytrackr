import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import { useEffect } from "react";
import type { JournalEntry } from "../JournalInterfaces";
import useJournalState from "./useJournalState";

export interface JournalEntriesApiCallResponse {
  results: JournalEntry[];
}

const useJournalEntriesApiCall =
  (): AxiosFetchWrapperResponse<JournalEntriesApiCallResponse> => {
    const { journalEntries } = useJournalState();
    const { fetch, data, loading, error } =
      useAxiosFetch<JournalEntriesApiCallResponse>("journal-entries/");

    useEffect(() => {
      if (journalEntries.length > 0) return;
      fetch();
    }, [fetch]);

    return { fetch, data, loading, error };
  };

export default useJournalEntriesApiCall;
