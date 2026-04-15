import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

const useDeleteJournalEntryApiCall = (): AxiosFetchWrapperResponse<{}> => {
  const { fetch, data, loading, error } = useAxiosFetch<{}>(
    `journal-entries/`,
    {
      method: "DELETE",
    },
  );

  return { fetch, data, loading, error };
};

export default useDeleteJournalEntryApiCall;
