import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { JournalEntry } from "@pages/Journal/JournalInterfaces";

const useGetJournalEntryByDateApiCall = (): AxiosFetchWrapperResponse<
  JournalEntry[]
> => {
  const { fetch, data, loading, error } = useAxiosFetch<JournalEntry[]>(
    `journal-entries/by-date/`,
    {
      method: "GET",
    },
  );

  return { fetch, data, loading, error };
};

export default useGetJournalEntryByDateApiCall;
