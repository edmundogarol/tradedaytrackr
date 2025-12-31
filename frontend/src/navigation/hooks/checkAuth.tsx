import React from "react";
import type { User } from "@interfaces/CustomTypes";
import { Navigate } from "react-router";
import { PageEnum } from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";

const checkAuth = ({ user }: { user: User }): React.ReactElement => {
  if (user?.logged_in) {
    return <Navigate to={PageEnum.Dashboard} replace />;
  }
  return <Login />;
};

export default checkAuth;
