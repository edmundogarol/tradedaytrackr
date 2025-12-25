import React from "react";
import { Route, Routes } from "react-router";
import { PageEnum } from "@interfaces/NavigationTypes";
import App from "src/App";

const AuthenticatedNavigator: React.FC = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<App />} />
        <Route path={PageEnum.Login} element={<App />} />
      </Route>
    </Routes>
  );
};

export default AuthenticatedNavigator;
