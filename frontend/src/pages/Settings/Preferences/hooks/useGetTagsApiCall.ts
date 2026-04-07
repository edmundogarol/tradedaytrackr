import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Tag } from "@interfaces/CustomTypes";

export interface GetTagsApiCallData {
  results: Tag[];
}

const useGetTagsApiCall = (): AxiosFetchWrapperResponse<GetTagsApiCallData> => {
  const { fetch, data, loading, error } =
    useAxiosFetch<GetTagsApiCallData>(`tags/`);

  return { fetch, data, loading, error };
};

export default useGetTagsApiCall;
