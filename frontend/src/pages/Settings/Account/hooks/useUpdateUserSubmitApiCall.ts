import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

interface UpdateUserSubmitApiCallData {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

const useUpdateUserSubmitApiCall =
  (): AxiosFetchWrapperResponse<UpdateUserSubmitApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<UpdateUserSubmitApiCallData>(`user/me/`, {
        method: "PATCH",
      });

    return { fetch, data, loading, error };
  };

export default useUpdateUserSubmitApiCall;
