import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import useLoginState from "@pages/Login/hooks/useLoginState";

const useResetPasswordApiCall = (): AxiosFetchWrapperResponse<{}> => {
  const { resetPasswordForm } = useLoginState();
  const { fetch, data, loading, error } = useAxiosFetch<{}>("reset-password/", {
    method: "POST",
    data: resetPasswordForm,
  });

  return {
    fetch,
    data,
    loading,
    error,
  };
};

export default useResetPasswordApiCall;
