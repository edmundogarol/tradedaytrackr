import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export interface VerificationApiCallData {
  detail?: string;
}

export interface VerificationApiCallError {
  error?: string;
}

const useVerificationApiCall = (): AxiosFetchWrapperResponse<
  VerificationApiCallData,
  VerificationApiCallError
> => {
  const [searchParams] = useSearchParams();
  const verification_token = searchParams.get("verification_token");
  const { fetch, data, loading, error } = useAxiosFetch<
    VerificationApiCallData,
    VerificationApiCallError
  >("verify-account/", {
    method: "POST",
    data: {
      token: verification_token,
    },
  });

  useEffect(() => {
    if (verification_token) {
      fetch();
    }
  }, []);

  return { fetch, data, loading, error };
};

export default useVerificationApiCall;
