import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

export interface DeleteAccountApiCallData {
  detail: string;
}
export interface DeleteAccountApiCallError {
  detail: string;
}

const useDeleteAccountApiCall = (): AxiosFetchWrapperResponse<
  DeleteAccountApiCallData,
  DeleteAccountApiCallError
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    DeleteAccountApiCallData,
    DeleteAccountApiCallError
  >("user/delete_me/", {
    method: "DELETE",
  });

  return { fetch, data, loading, error };
};

export default useDeleteAccountApiCall;
