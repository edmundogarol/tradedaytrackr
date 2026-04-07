import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

const useDeleteAccountTemplatesApiCall = (): AxiosFetchWrapperResponse<{}> => {
  const { fetch, data, loading, error } = useAxiosFetch<{}>(`tags/`, {
    method: "DELETE",
  });

  return { fetch, data, loading, error };
};

export default useDeleteAccountTemplatesApiCall;
