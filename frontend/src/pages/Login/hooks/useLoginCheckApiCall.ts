import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { User } from "@interfaces/CustomTypes";
import { useEffect } from "react";

export interface LoginCheckApiCallData {
  user: User;
  logged_in: boolean;
}
export interface LoginCheckApiCallError {
  response?: {
    status: number;
  };
}

const useLoginCheckApiCall = (): AxiosFetchWrapperResponse<
  LoginCheckApiCallData,
  LoginCheckApiCallError
> => {
  const { fetch, data, loading, error } =
    useAxiosFetch<LoginCheckApiCallData>("login/");

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { fetch, data, loading, error };
};

export default useLoginCheckApiCall;
