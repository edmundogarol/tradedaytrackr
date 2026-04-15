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
    const { deleteJournalEntryErrors } = useJournalState();
    const { fetch, data, loading, error } =
      useAxiosFetch<JournalEntriesApiCallResponse>("journal-entries/");

    useEffect(() => {
      fetch();
    }, [deleteJournalEntryErrors]);

    return { fetch, data, loading, error };
  };

export default useJournalEntriesApiCall;
