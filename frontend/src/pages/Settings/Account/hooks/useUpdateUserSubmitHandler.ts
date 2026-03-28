import type { User, UserPasswordUpdateData } from "@interfaces/CustomTypes";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { initialState } from "@pages/Login/LoginState";
import { useCallback } from "react";
import useLoginSubmitApiCall from "./useUpdateUserSubmitApiCall";

interface UpdateUserSubmitHandler {
  updateUser: (user: User | UserPasswordUpdateData) => Promise<void>;
  loading: boolean;
}

const useUpdateUserSubmitHandler = (): UpdateUserSubmitHandler => {
  const {
    updateUser,
    updateUserUpdateSuccess,
    updateUserDetailsErrors,
    updatePasswordFormErrors,
  } = useLoginDispatch();
  const { user: userState } = useLoginState();
  const { fetch, loading } = useLoginSubmitApiCall();
  const { updatePasswordForm } = useLoginDispatch();

  return {
    updateUser: useCallback(
      async (user: User | UserPasswordUpdateData) => {
        const { error, data } = await fetch({
          data: {
            ...user,
          },
        });

        if (!!data) {
          updateUser({
            ...userState,
            ...data,
          });
          if (
            (user as User).email ||
            (user as User).first_name ||
            (user as User).last_name ||
            (user as User).username
          ) {
            updateUserUpdateSuccess(true);
          } else {
            updatePasswordFormErrors(data);
            updatePasswordForm(initialState.passwordForm);
          }
        } else if (error) {
          console.log("Update User Post fetch error", error);
          updateUserUpdateSuccess(false);
          updateUserDetailsErrors(error);
          updatePasswordFormErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useUpdateUserSubmitHandler;
