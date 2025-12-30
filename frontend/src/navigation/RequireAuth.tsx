import React from "react";
import { PageEnum } from "@interfaces/NavigationTypes";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { Navigate, Outlet } from "react-router";

const RequireAuth: React.FC = () => {
  const { user } = useLoginState();

  if (!user?.logged_in) {
    return <Navigate to={PageEnum.Login} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
