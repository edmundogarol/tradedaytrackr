import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import { useEffect } from "react";
import { initialState } from "../LoginState";
import type {
  DeleteAccountApiCallData,
  DeleteAccountApiCallError,
} from "./useDeleteAccountApiCall";
import useLoginDispatch from "./useLoginDispatch";

const useDeleteAccountHandler = ({
  data,
  loading,
  error,
}: AxiosFetchWrapperResponse<
  DeleteAccountApiCallData,
  DeleteAccountApiCallError
>): void => {
  const { updateIsHydrated, updateUser, updateDeleteAccountError } =
    useLoginDispatch();

  useEffect(() => {
    if (!data && !error) return;

    if (error) {
      console.log("Delete account error", error);
      updateDeleteAccountError(
        error.detail ||
          "An error occurred while deleting your account. Please try later.",
      );
      return;
    }
    if (data) {
      updateDeleteAccountError(data.detail || "Your account has been deleted.");
      updateUser(initialState.user); // Clear user data on successful account deletion
    }

    updateIsHydrated(true);
  }, [data, error]);
};

export default useDeleteAccountHandler;
