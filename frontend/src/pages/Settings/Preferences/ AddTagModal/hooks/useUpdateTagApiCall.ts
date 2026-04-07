import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Tag } from "@interfaces/CustomTypes";

interface UpdateTagApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useUpdateTagApiCall = (): AxiosFetchWrapperResponse<
  Tag,
  UpdateTagApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    Tag,
    UpdateTagApiCallErrors
  >(`tags/`, {
    method: "PATCH",
  });

  return { fetch, data, loading, error };
};

export default useUpdateTagApiCall;
