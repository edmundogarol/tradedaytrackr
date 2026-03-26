import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { useCallback } from "react";
import useUpdateEmailPreferencesSubmitApiCall from "./useUpdateEmailPreferencesSubmitApiCall";

interface UpdateEmailPreferencesSubmitHandler {
  update: (emailPreferences: {
    payout_reports: boolean;
    system_notifications: boolean;
    promotional_offers: boolean;
    unsubscribe_all: boolean;
  }) => Promise<void>;
  loading: boolean;
}

const useUpdateEmailPreferencesSubmitHandler =
  (): UpdateEmailPreferencesSubmitHandler => {
    const { updateEmailPreferences } = useLoginDispatch();
    const { emailPreferences: currentEmailPreferences } = useLoginState();
    const { fetch, loading } = useUpdateEmailPreferencesSubmitApiCall();

    return {
      update: useCallback(
        async (emailPreferences: {
          payout_reports?: boolean;
          system_notifications?: boolean;
          promotional_offers?: boolean;
          unsubscribe_all?: boolean;
        }) => {
          const { error, data } = await fetch({
            data: emailPreferences,
          });

          if (!!data) {
            console.log({ data });
            updateEmailPreferences({
              ...data,
            });
          } else if (error) {
            console.log("Update User Post fetch error", error);
            setTimeout(() => {
              updateEmailPreferences({
                ...currentEmailPreferences,
              });
            }, 300);
          }
        },
        [loading, currentEmailPreferences, updateEmailPreferences],
      ),
      loading,
    };
  };

export default useUpdateEmailPreferencesSubmitHandler;
