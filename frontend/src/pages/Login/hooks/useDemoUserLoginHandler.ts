import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { useCallback } from "react";
import useLoginSubmitApiCall from "./useLoginSubmitApiCall";

interface UseDemoUserLoginHandlerProps {
  loginDemoUser: () => Promise<void>;
  loading: boolean;
}

const useDemoUserLoginHandler = (): UseDemoUserLoginHandlerProps => {
  const { updateUser, updateEmailPreferences, updateIsHydrated } =
    useLoginDispatch();
  const { user: userState } = useLoginState();
  const { fetch, loading } = useLoginSubmitApiCall();

  return {
    loginDemoUser: useCallback(async () => {
      const { error, data } = await fetch({
        data: {
          email: "demo@user.com",
          password: "demopassword",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      });

      if (!data && !error) return;

      if (error) {
        console.log("Demo Login error", error);

        updateUser({ ...userState, logged_in: false });
        updateEmailPreferences({ ...userState.email_preferences });
        updateIsHydrated(true);
        return;
      }

      if (data?.user) {
        updateUser({
          ...data.user,
          logged_in: data.logged_in,
        });
      } else {
        updateUser({ ...userState, logged_in: false });
      }

      updateIsHydrated(true);
    }, [loading]),
    loading,
  };
};

export default useDemoUserLoginHandler;
