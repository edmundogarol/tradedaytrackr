import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import { useEffect } from "react";
import type {
  LoginCheckApiCallData,
  LoginCheckApiCallError,
} from "./useLoginCheckApiCall";
import useLoginDispatch from "./useLoginDispatch";
import useLoginState from "./useLoginState";

const useLoginCheckHandler = ({
  data,
  loading,
  error,
}: AxiosFetchWrapperResponse<
  LoginCheckApiCallData,
  LoginCheckApiCallError
>): void => {
  const { user } = useLoginState();
  const { updateUser, updateIsHydrated } = useLoginDispatch();

  useEffect(() => {
    // if (data) {
    //   if (data?.user) {
    //     updateUser({
    //       ...data?.user,
    //       logged_in: data?.logged_in,
    //     });
    //   } else {
    //     updateUser(data as unknown as User);
    //   }
    // } else if (error) {
    //   console.log("Login check fetch error", error);
    // }
  }, [data, error, loading]);
};

export default useLoginCheckHandler;
