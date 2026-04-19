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
  error,
}: AxiosFetchWrapperResponse<
  LoginCheckApiCallData,
  LoginCheckApiCallError
>): void => {
  const { user } = useLoginState();
  const { updateUser, updateIsHydrated, updateEmailPreferences } =
    useLoginDispatch();

  useEffect(() => {
    if (!data && !error) return;

    if (error) {
      console.log("Login check fetch error", error);

      updateUser({ ...user, logged_in: false });
      updateEmailPreferences({ ...user.email_preferences });
      updateIsHydrated(true);
      return;
    }

    if (data?.user) {
      updateUser({
        ...data.user,
        logged_in: data.logged_in,
      });
    } else {
      updateUser({ ...user, logged_in: false });
    }

    updateIsHydrated(true);
  }, [data, error]);
};

export default useLoginCheckHandler;
