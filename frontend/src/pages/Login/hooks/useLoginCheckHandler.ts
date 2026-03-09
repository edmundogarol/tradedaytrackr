import { useEffect } from "react";
import type { User } from "@interfaces/CustomTypes";
import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import type { LoginCheckApiCallData } from "./useLoginCheckApiCall";
import useLoginDispatch from "./useLoginDispatch";

const useLoginCheckHandler = ({
  data,
  loading,
  error,
}: AxiosFetchWrapperResponse<LoginCheckApiCallData>): void => {
  const { updateUser } = useLoginDispatch();

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
