import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { PageEnum } from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";
import ResetPassword from "@pages/ResetPassword/ResetPassword";
import PageNotFound from "@components/PageNotFound/PageNotFound";

const UnauthenticatedNavigator: React.FC = () => {
  return (
    <Routes>
      <Route path="/root" element={<Navigate to={PageEnum.Login} replace />} />
      <Route path="/" element={<Navigate to={PageEnum.Login} replace />} />
      <Route path={PageEnum.Login} element={<Login />} />
      <Route path={PageEnum.SignUp} element={<SignUp />} />
      <Route path={PageEnum.ResetPassword} element={<ResetPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UnauthenticatedNavigator;
