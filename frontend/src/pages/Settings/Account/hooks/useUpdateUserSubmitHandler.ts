import type { User } from "@interfaces/CustomTypes";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { useCallback } from "react";
import useLoginSubmitApiCall from "./useUpdateUserSubmitApiCall";

interface UpdateUserSubmitHandler {
  updateUser: (user: User) => Promise<void>;
  loading: boolean;
}

const useUpdateUserSubmitHandler = (): UpdateUserSubmitHandler => {
  const { updateUser, updateUserUpdateSuccess } = useLoginDispatch();
  const { fetch, loading } = useLoginSubmitApiCall();

  return {
    updateUser: useCallback(
      async (user: User) => {
        const { error, data } = await fetch({
          data: {
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        });

        if (!!data) {
          updateUser({
            ...user,
            ...data,
          });
          updateUserUpdateSuccess(true);
        } else if (error) {
          console.log("Update User Post fetch error", error);
          updateUserUpdateSuccess(false);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useUpdateUserSubmitHandler;
