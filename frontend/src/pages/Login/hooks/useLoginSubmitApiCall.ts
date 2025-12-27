import type { User } from "@interfaces/CustomTypes";
import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import useLoginState from "./useLoginState";

interface LoginSubmitApiCallData {
  user: User;
  logged_in: boolean;
}

const useLoginSubmitApiCall =
  (): AxiosFetchWrapperResponse<LoginSubmitApiCallData> => {
    const { loginForm } = useLoginState();
    const { fetch, data, loading, error } =
      useAxiosFetch<LoginSubmitApiCallData>("login/", {
        method: "POST",
        data: loginForm,
      });

    return { fetch, data, loading, error };
  };

export default useLoginSubmitApiCall;
