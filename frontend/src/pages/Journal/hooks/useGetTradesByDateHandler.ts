import environmentConfig from "@utils/environmentConfig";
import { keysToCamel } from "@utils/utils";
import { useCallback } from "react";
import useGetTradesByDateApiCall from "./useGetTradesByDateApiCall";
import useJournalDispatch from "./useJournalDispatch";

interface GetTradesByDateHandler {
  getTradesByDate: (date: string) => Promise<void>;
  loading: boolean;
}

const useGetTradesByDateHandler = (): GetTradesByDateHandler => {
  const { fetch, loading } = useGetTradesByDateApiCall();
  const { updateSelectedDateTrades, updateSelectedDateTradesErrors } =
    useJournalDispatch();

  return {
    getTradesByDate: useCallback(
      async (date: string) => {
        const { error, data } = await fetch({
          method: "GET",
          url: `${environmentConfig.HOST}/api/trades/by-date/?date=${date}`,
        });

        if (!!data) {
          updateSelectedDateTrades(keysToCamel(data));
        } else if (error) {
          console.warn(error);
          updateSelectedDateTradesErrors(
            error || {
              detail:
                "An error occurred while fetching trades for the selected date. Please try again.",
            },
          );
        }
      },
      [loading],
    ),
    loading,
  };
};

export default useGetTradesByDateHandler;
