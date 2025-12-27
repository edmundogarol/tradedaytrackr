import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { PageEnum } from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";

const UnauthenticatedNavigator: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PageEnum.Login} replace />} />
      <Route path={PageEnum.Login} element={<Login />} />
      <Route path={PageEnum.SignUp} element={<SignUp />} />
    </Routes>
  );
};

export default UnauthenticatedNavigator;
