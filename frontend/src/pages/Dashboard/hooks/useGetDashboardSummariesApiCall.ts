import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { DashboardSummaries } from "@interfaces/CustomTypes";

const useGetDashboardSummariesApiCall =
  (): AxiosFetchWrapperResponse<DashboardSummaries> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<DashboardSummaries>(`dashboard/summaries/`);

    return { fetch, data, loading, error };
  };

export default useGetDashboardSummariesApiCall;
