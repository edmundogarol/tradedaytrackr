import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { User } from "@interfaces/CustomTypes";

interface UpdateUserSubmitApiCallData {
  email?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  user?: User;
}

const useUpdateUserSubmitApiCall =
  (): AxiosFetchWrapperResponse<UpdateUserSubmitApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<UpdateUserSubmitApiCallData>(`user/update_me/`, {
        method: "PATCH",
      });

    return { fetch, data, loading, error };
  };

export default useUpdateUserSubmitApiCall;
