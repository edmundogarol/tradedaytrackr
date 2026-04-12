import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { useCallback } from "react";
import useUpdateUserSubmitApiCall from "./useUpdateUserSubmitApiCall";

interface UpdateUserTimezoneSubmitHandler {
  updateUserTimezone: (timezone: string) => Promise<void>;
  loading: boolean;
}

const useUpdateUserTimezoneSubmitHandler =
  (): UpdateUserTimezoneSubmitHandler => {
    const { fetch, loading } = useUpdateUserSubmitApiCall();
    const { updateUser, updateTimezoneErrors, updateTimezoneUpdateModalOpen } =
      useLoginDispatch();

    return {
      updateUserTimezone: useCallback(
        async (timezone: string) => {
          const { error, data } = await fetch({
            data: {
              timezone,
            },
          });

          if (!!data?.user) {
            updateUser({
              ...data.user,
            });
            updateTimezoneErrors({ detail: "Successfully updated timezone" });
            updateTimezoneUpdateModalOpen(false);
          } else if (error) {
            console.log("Update User Post fetch error", error);
            updateTimezoneErrors(error);
          }
        },
        [loading],
      ),
      loading,
    };
  };

export default useUpdateUserTimezoneSubmitHandler;
