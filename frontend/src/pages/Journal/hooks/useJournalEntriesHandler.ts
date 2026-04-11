import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import { keysToCamel } from "@utils/utils";
import { useEffect } from "react";
import useJournalDispatch from "./useJournalDispatch";
import type { JournalEntriesApiCallResponse } from "./useJournalEntriesApiCall";

const useJournalEntriesHandler = ({
  data,
  loading,
  error,
}: AxiosFetchWrapperResponse<JournalEntriesApiCallResponse>): void => {
  const { updateJournalEntries } = useJournalDispatch();

  useEffect(() => {
    if (!data && !error) return;

    if (error) {
      console.log("Journal entries fetch error", error);
      return;
    }

    if (data) {
      updateJournalEntries(keysToCamel(data.results));
    }
  }, [data, error]);
};

export default useJournalEntriesHandler;
