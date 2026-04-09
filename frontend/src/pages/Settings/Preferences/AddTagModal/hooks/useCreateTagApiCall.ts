import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Tag } from "@interfaces/CustomTypes";

interface CreateTagApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useCreateTagApiCall = (): AxiosFetchWrapperResponse<
  Tag,
  CreateTagApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    Tag,
    CreateTagApiCallErrors
  >(`tags/`, {
    method: "POST",
  });

  return { fetch, data, loading, error };
};

export default useCreateTagApiCall;
