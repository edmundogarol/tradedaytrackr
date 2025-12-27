import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "@pages/Login/LoginState";

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: [],
    ignoredPaths: [],
  },
};

export default configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareConfig),
});
