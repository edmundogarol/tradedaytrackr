import type { User, UserPasswordUpdateData } from "@interfaces/CustomTypes";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { useCallback } from "react";
import useLoginSubmitApiCall from "./useUpdateUserSubmitApiCall";

interface UpdateUserSubmitHandler {
  updateUser: (user: User | UserPasswordUpdateData) => Promise<void>;
  loading: boolean;
}

const useUpdateUserSubmitHandler = (): UpdateUserSubmitHandler => {
  const { updateUser, updateUserUpdateSuccess, updateUserDetailsErrors } =
    useLoginDispatch();
  const { user: userState } = useLoginState();
  const { fetch, loading } = useLoginSubmitApiCall();

  return {
    updateUser: useCallback(
      async (user: User | UserPasswordUpdateData) => {
        const { error, data } = await fetch({
          data: {
            username: (user as User)?.username,
            email: (user as User)?.email,
            first_name: (user as User)?.first_name,
            last_name: (user as User)?.last_name,
          },
        });

        if (!!data) {
          updateUser({
            ...userState,
            ...data,
          });
          updateUserUpdateSuccess(true);
        } else if (error) {
          console.log("Update User Post fetch error", error);
          updateUserUpdateSuccess(false);
          updateUserDetailsErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useUpdateUserSubmitHandler;
