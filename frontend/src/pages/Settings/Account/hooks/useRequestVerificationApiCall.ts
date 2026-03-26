import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

interface RequestVerificationApiCallData {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

const useRequestVerificationApiCall =
  (): AxiosFetchWrapperResponse<RequestVerificationApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<RequestVerificationApiCallData>(`request-verification/`, {
        method: "POST",
      });

    return { fetch, data, loading, error };
  };

export default useRequestVerificationApiCall;
