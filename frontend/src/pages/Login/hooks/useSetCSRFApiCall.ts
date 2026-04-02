import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

export interface SetCSRFApiCallData {
  detail: string;
}

const useSetCSRFApiCall = (): AxiosFetchWrapperResponse<SetCSRFApiCallData> => {
  const { fetch, data, loading, error } =
    useAxiosFetch<SetCSRFApiCallData>("csrf/");

  return { fetch, data, loading, error };
};

export default useSetCSRFApiCall;
