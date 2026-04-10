import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import { useEffect } from "react";
import type { JournalEntry } from "../JournalInterfaces";

const useJournalEntriesApiCall = (): AxiosFetchWrapperResponse<
  JournalEntry[]
> => {
  const { fetch, data, loading, error } =
    useAxiosFetch<JournalEntry[]>("journal-entries/");

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { fetch, data, loading, error };
};

export default useJournalEntriesApiCall;
