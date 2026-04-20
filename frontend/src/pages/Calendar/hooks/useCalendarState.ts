import type { StoreState } from "@redux/interfaces";
import { useSelector } from "react-redux";
import type { CalendarState } from "../CalendarState";

const useCalendarState = (): CalendarState => {
  return useSelector((state: StoreState) => state.calendar);
};

export default useCalendarState;
