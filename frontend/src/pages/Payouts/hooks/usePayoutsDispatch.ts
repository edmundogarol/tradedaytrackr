import type { Payout } from "@interfaces/CustomTypes";
import type { Dispatch } from "react";
import { useDispatch } from "react-redux";
import {
  updateCurrentPage,
  updateEndDateFilter,
  updateFirmFilter,
  updateItemsCount,
  updateNextPage,
  updatePayouts,
  updatePayoutsErrors,
  updateStartDateFilter,
  type PayoutsAction,
} from "../PayoutsState";

interface PayoutsDispatch {
  updatePayouts: (payouts: Payout[]) => void;
  updatePayoutsErrors: (errors: { [key: string]: any }) => void;
  updateFirmFilter: (firm: string | undefined) => void;
  updateStartDateFilter: (startDate: string | undefined) => void;
  updateEndDateFilter: (endDate: string | undefined) => void;
  updateCurrentPage: (page: number) => void;
  updateItemsCount: (count: number) => void;
  updateNextPage: (nextPage: string | null) => void;
}

export const usePayoutsDispatch = (): PayoutsDispatch => {
  const dispatch: Dispatch<PayoutsAction> = useDispatch();
  return {
    updatePayouts(payouts: Payout[]): void {
      dispatch(updatePayouts(payouts));
    },
    updatePayoutsErrors(errors: { [key: string]: string }): void {
      dispatch(updatePayoutsErrors(errors));
    },
    updateFirmFilter(firm: string | undefined): void {
      dispatch(updateFirmFilter(firm));
    },
    updateStartDateFilter(startDate: string | undefined): void {
      dispatch(updateStartDateFilter(startDate));
    },
    updateEndDateFilter(endDate: string | undefined): void {
      dispatch(updateEndDateFilter(endDate));
    },
    updateCurrentPage(page: number): void {
      dispatch(updateCurrentPage(page));
    },
    updateItemsCount(count: number): void {
      dispatch(updateItemsCount(count));
    },
    updateNextPage(nextPage: string | null): void {
      dispatch(updateNextPage(nextPage));
    },
  };
};

export default usePayoutsDispatch;
