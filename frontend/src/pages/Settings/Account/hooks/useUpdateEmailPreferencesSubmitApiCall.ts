import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

interface UpdateEmailPreferencesSubmitApiCallData {
  payout_reports: boolean;
  system_notifications: boolean;
  promotional_offers: boolean;
  unsubscribe_all: boolean;
}

const useUpdateEmailPreferencesSubmitApiCall =
  (): AxiosFetchWrapperResponse<UpdateEmailPreferencesSubmitApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<UpdateEmailPreferencesSubmitApiCallData>(
        `email-preferences/`,
        {
          method: "PATCH",
        },
      );

    return { fetch, data, loading, error };
  };

export default useUpdateEmailPreferencesSubmitApiCall;
