import useLoginCheckApiCall from "@pages/Login/hooks/useLoginCheckApiCall";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { useCallback } from "react";
import useGetMonthlyPayoutSummariesHandler from "./useGetMonthlyPayoutSummariesHandler";
import useGetPayoutsHandler from "./useGetPayoutsHandler";
import usePayoutsDispatch from "./usePayoutsDispatch";
import useUpdateCurrencyApiCall from "./useUpdateCurrencyApiCall";

interface UpdateCurrencyHandler {
  updateCurrency: (currency: string) => Promise<void>;
  loading: boolean;
}

const useUpdateCurrencyHandler = (): UpdateCurrencyHandler => {
  const { fetch, loading } = useUpdateCurrencyApiCall();
  const { updatePayoutsErrors } = usePayoutsDispatch();
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();
  const { getPayouts } = useGetPayoutsHandler();
  const { getMonthlyPayoutSummaries } = useGetMonthlyPayoutSummariesHandler();
  const { fetch: loginCheck } = useLoginCheckApiCall();
  return {
    updateCurrency: useCallback(
      async (currency: string) => {
        const { error, data } = await fetch({
          data: {
            currency,
          },
        });

        if (!!data) {
          const { data: userData, error: userError } = await loginCheck();
          if (userData) {
            updateUser({ ...user, ...userData.user });
            updatePayoutsErrors({});
          } else if (userError) {
            console.log(
              "Login check fetch error after currency update",
              userError,
            );
            updatePayoutsErrors(userError);
          }
          getPayouts(1);
          getMonthlyPayoutSummaries(1);
        } else if (error) {
          updatePayoutsErrors(error);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useUpdateCurrencyHandler;
