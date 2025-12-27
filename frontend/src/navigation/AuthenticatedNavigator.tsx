import React from "react";
import { Route, Routes } from "react-router";
import { PageEnum } from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";

const AuthenticatedNavigator: React.FC = () => {
  return (
    <Routes>
      <Route element={<Login />}>
        <Route index element={<Login />} />
        <Route path={PageEnum.Login} element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AuthenticatedNavigator;
