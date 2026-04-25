import type { CalendarState } from "@pages/Calendar/CalendarState";
import type { JournalState } from "@pages/Journal/JournalState";
import type { LoginState } from "@pages/Login/LoginState";
import type { PayoutsState } from "@pages/Payouts/PayoutsState";
import type { SettingsState } from "@pages/Settings/SettingsState";

export interface StoreState {
  login: LoginState;
  journal: JournalState;
  settings: SettingsState;
  payouts: PayoutsState;
  calendar: CalendarState;
  reports: any;
}
