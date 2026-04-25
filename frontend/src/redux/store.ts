import { calendarReducer } from "@pages/Calendar/CalendarState";
import { fundedAccountsReducer } from "@pages/FundedAccounts/FundedAccountsState";
import { journalReducer } from "@pages/Journal/JournalState";
import { loginReducer } from "@pages/Login/LoginState";
import { payoutsReducer } from "@pages/Payouts/PayoutsState";
import { reportsReducer } from "@pages/Reports/ReportsState";
import { settingsReducer } from "@pages/Settings/SettingsState";
import { configureStore } from "@reduxjs/toolkit";

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: [],
    ignoredPaths: [],
  },
};

export default configureStore({
  reducer: {
    login: loginReducer,
    journal: journalReducer,
    settings: settingsReducer,
    fundedAccounts: fundedAccountsReducer,
    payouts: payoutsReducer,
    calendar: calendarReducer,
    reports: reportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareConfig),
});
