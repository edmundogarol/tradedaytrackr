import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { Rule } from "@interfaces/CustomTypes";

export interface GetTemplateRulesApiCallData {
  results: Rule[];
}

const useGetTemplateRulesApiCall =
  (): AxiosFetchWrapperResponse<GetTemplateRulesApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GetTemplateRulesApiCallData>(`rules/`);

    return { fetch, data, loading, error };
  };

export default useGetTemplateRulesApiCall;
