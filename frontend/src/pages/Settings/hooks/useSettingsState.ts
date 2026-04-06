import type { StoreState } from "@redux/interfaces";
import { useSelector } from "react-redux";
import type { SettingsState } from "../SettingsState";

const useSettingsState = (): SettingsState => {
  return useSelector((state: StoreState) => state.settings);
};

export default useSettingsState;
