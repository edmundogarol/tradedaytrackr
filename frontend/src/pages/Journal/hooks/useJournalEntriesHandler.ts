import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import { keysToCamel } from "@utils/utils";
import { useEffect } from "react";
import type { JournalEntry } from "../JournalInterfaces";
import useJournalDispatch from "./useJournalDispatch";

const useJournalEntriesHandler = ({
  data,
  loading,
  error,
}: AxiosFetchWrapperResponse<JournalEntry[]>): void => {
  const { updateJournalEntries } = useJournalDispatch();

  useEffect(() => {
    if (!data && !error) return;

    if (error) {
      console.log("Journal entries fetch error", error);
      return;
    }

    if (data) {
      updateJournalEntries(keysToCamel(data));
    }
  }, [data, error]);
};

export default useJournalEntriesHandler;
