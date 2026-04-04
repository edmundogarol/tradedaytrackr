import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

export interface GenerateTagsAIApiCallData {
  strategy: string;
  tags: string[];
}

const useGenerateTagsAIApiCall =
  (): AxiosFetchWrapperResponse<GenerateTagsAIApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GenerateTagsAIApiCallData>("ai/tags/", {
        method: "POST",
      });

    return { fetch, data, loading, error };
  };

export default useGenerateTagsAIApiCall;
