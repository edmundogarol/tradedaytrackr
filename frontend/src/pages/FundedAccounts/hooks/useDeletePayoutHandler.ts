import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import { initialState, updateSelectedTrade } from "../FundedAccountsState";
import useDeleteTradeApiCall from "./useDeleteTradeApiCall";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useFundedAccountsState from "./useFundedAccountsState";
import useGetTradingAccountDetailHandler from "./useGetTradingAccountDetailHandler";

interface DeletePayoutHandler {
  deletePayout: (id: string) => Promise<void>;
  loading: boolean;
}

const useDeletePayoutHandler = (): DeletePayoutHandler => {
  const { fetch, loading } = useDeleteTradeApiCall();
  const {
    updateDeleteTradeErrors,
    updateDeleteTradeModalOpen,
    updateAddTradeModalOpen,
  } = useFundedAccountsDispatch();
  const { selectedTrade } = useFundedAccountsState();
  const { getTradingAccount } = useGetTradingAccountDetailHandler();
  return {
    deletePayout: useCallback(
      async (id: string) => {
        const accountId = selectedTrade.account?.id;

        const { error } = await fetch({
          url: `${environmentConfig.HOST}/api/payouts/${id.replace("payout-", "")}/`,
        });

        if (error) {
          updateDeleteTradeErrors({
            error: (error as any)?.message || "Something went wrong",
          });
        } else {
          getTradingAccount(accountId.toString());
          updateDeleteTradeErrors({
            detail: "Payout deleted successfully",
          });
          updateDeleteTradeModalOpen(false);
          updateAddTradeModalOpen(false);
          updateSelectedTrade({
            ...initialState.selectedTrade,
            account: {
              id: accountId,
            } as any,
          });
        }
      },
      [
        loading,
        selectedTrade.account?.id,
        getTradingAccount,
        updateDeleteTradeErrors,
        updateDeleteTradeModalOpen,
        updateAddTradeModalOpen,
      ],
    ),
    loading,
  };
};

export default useDeletePayoutHandler;
