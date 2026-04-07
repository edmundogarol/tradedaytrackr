import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { AccountTemplate } from "@interfaces/CustomTypes";

export interface DeleteAccountTemplatesApiCallData {
  results: AccountTemplate[];
}

const useDeleteAccountTemplatesApiCall =
  (): AxiosFetchWrapperResponse<DeleteAccountTemplatesApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<DeleteAccountTemplatesApiCallData>(
        `trading-account-templates/`,
        { method: "DELETE" },
      );

    return { fetch, data, loading, error };
  };

export default useDeleteAccountTemplatesApiCall;
