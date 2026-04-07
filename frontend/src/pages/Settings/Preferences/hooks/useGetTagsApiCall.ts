import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { AccountTemplate } from "@interfaces/CustomTypes";

export interface GetAccountTemplatesApiCallData {
  results: AccountTemplate[];
}

const useGetAccountTemplatesApiCall =
  (): AxiosFetchWrapperResponse<GetAccountTemplatesApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<GetAccountTemplatesApiCallData>(
        `trading-account-templates/`,
      );

    return { fetch, data, loading, error };
  };

export default useGetAccountTemplatesApiCall;
