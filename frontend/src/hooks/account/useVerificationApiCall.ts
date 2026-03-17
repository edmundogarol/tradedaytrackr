import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { User } from "@interfaces/CustomTypes";
import { useEffect } from "react";

export interface VerificationApiCallData {
  user: User;
  logged_in: boolean;
}

const useVerificationApiCall =
  (): AxiosFetchWrapperResponse<VerificationApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<VerificationApiCallData>("verify-account/");

    useEffect(() => {
      fetch();
    }, [fetch]);

    return { fetch, data, loading, error };
  };

export default useVerificationApiCall;
