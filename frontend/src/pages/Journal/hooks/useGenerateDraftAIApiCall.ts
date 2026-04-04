import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

export interface GenerateDraftAIApiCallData {
  description: string;
}

const useGenerateDraftAIApiCall =
  (): AxiosFetchWrapperResponse<GenerateDraftAIApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GenerateDraftAIApiCallData>("ai/generate-draft/", {
        method: "POST",
      });

    return { fetch, data, loading, error };
  };

export default useGenerateDraftAIApiCall;
