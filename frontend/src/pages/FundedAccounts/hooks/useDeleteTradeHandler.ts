import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";
import { initialState, updateSelectedTrade } from "../FundedAccountsState";
import useDeleteTradeApiCall from "./useDeleteTradeApiCall";
import useFundedAccountsDispatch from "./useFundedAccountsDispatch";
import useFundedAccountsState from "./useFundedAccountsState";
import useGetTradingAccountDetailHandler from "./useGetTradingAccountDetailHandler";

interface DeleteTradeHandler {
  deleteTrade: (id: string) => Promise<void>;
  loading: boolean;
}

const useDeleteTradeHandler = (): DeleteTradeHandler => {
  const { fetch, loading } = useDeleteTradeApiCall();
  const {
    updateDeleteTradeErrors,
    updateDeleteTradeModalOpen,
    updateAddTradeModalOpen,
  } = useFundedAccountsDispatch();
  const { selectedTrade } = useFundedAccountsState();
  const { getTradingAccount } = useGetTradingAccountDetailHandler();
  return {
    deleteTrade: useCallback(
      async (id: string) => {
        console.log({ selectedTrade });
        const { error } = await fetch({
          url: `${environmentConfig.HOST}/api/trades/${id}/`,
        });

        if (error) {
          updateDeleteTradeErrors({
            error: (error as any)?.message || "Something went wrong",
          });
        } else {
          getTradingAccount(selectedTrade.account.id.toString());
          updateDeleteTradeErrors({
            detail: "Trade deleted successfully",
          });
          updateDeleteTradeModalOpen(false);
          updateAddTradeModalOpen(false);
          updateSelectedTrade(initialState.selectedTrade);
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useDeleteTradeHandler;
