import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { useEffect } from "react";
import type {
  VerificationApiCallData,
  VerificationApiCallError,
} from "./useVerificationApiCall";

const useVerificationHandler = ({
  data,
  loading,
  error,
}: AxiosFetchWrapperResponse<
  VerificationApiCallData,
  VerificationApiCallError
>): void => {
  const { updateVerificationError } = useLoginDispatch();
  useEffect(() => {
    if (data?.detail) {
      updateVerificationError(data.detail);
    } else if (error) {
      updateVerificationError(
        error.error ||
          "Account verification failed. Please try again or contact support if the issue persists.",
      );
    }
  }, [data, error, loading]);
};

export default useVerificationHandler;
