import React from "react";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginCheckApiCall from "@pages/Login/hooks/useLoginCheckApiCall";
import useLoginCheckHandler from "@pages/Login/hooks/useLoginCheckHandler";
import { Route, Routes } from "react-router";
import { PageEnum } from "@interfaces/NavigationTypes";
import PageNotFound from "@components/PageNotFound/PageNotFound";
import SignUp from "@pages/SignUp/SignUp";
import ResetPassword from "@pages/ResetPassword/ResetPassword";
import Dashboard from "@pages/Dashboard/Dashboard";
import LoadingPage from "@components/Loading/LoadingPage";
import RequireAuth from "./RequireAuth";
import checkAuth from "./hooks/checkAuth";

const AppNavigation: React.FunctionComponent = (): React.ReactElement => {
  const { user } = useLoginState();
  const loginCheckApiCall = useLoginCheckApiCall();
  const { loading } = loginCheckApiCall;
  useLoginCheckHandler(loginCheckApiCall);

  if (loading) return <LoadingPage />;

  return (
    <Routes>
      {/* Public routes */}
      <Route path={PageEnum.Login} element={checkAuth({ user })} />
      <Route path={PageEnum.SignUp} element={<SignUp />} />
      <Route path={PageEnum.ResetPassword} element={<ResetPassword />} />

      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path={PageEnum.Dashboard} element={<Dashboard />} />
      </Route>
      {/* Root */}
      <Route path="/" element={checkAuth({ user })} />
      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppNavigation;
