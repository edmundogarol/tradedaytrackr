import { useEffect } from "react";
import type { User } from "@interfaces/CustomTypes";
import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { useSearchParams } from "react-router";
import type { VerificationApiCallData } from "./useVerificationApiCall";

const useVerificationHandler = ({
  data,
  loading,
  error,
}: AxiosFetchWrapperResponse<VerificationApiCallData>): void => {
  const { updateUser } = useLoginDispatch();
  const [searchParams] = useSearchParams();
  const verification_token = searchParams.get("verification_token");
  console.log({ searchParams, verification_token });

  useEffect(() => {
    if (data) {
      if (data?.user) {
        updateUser({
          ...data?.user,
          logged_in: data?.logged_in,
        });
      } else {
        updateUser(data as unknown as User);
      }
    } else if (error) {
      console.log("Login check fetch error", error);
    }
  }, [data, error, loading]);
};

export default useVerificationHandler;
