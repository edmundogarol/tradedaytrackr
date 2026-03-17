import AlertPopout from "@components/Alert/AlertPopout";
import LoadingPage from "@components/Loading/LoadingPage";
import PageNotFound from "@components/PageNotFound/PageNotFound";
import useVerificationApiCall from "@hooks/account/useVerificationApiCall";
import useVerificationHandler from "@hooks/account/useVerificationHandler";
import { PageEnum } from "@interfaces/NavigationTypes";
import Dashboard from "@pages/Dashboard/Dashboard";
import EvaluationAccountDetail from "@pages/EvaluationAccounts/EvaluationAccountDetail/EvaluationAccountDetail";
import EvaluationAccounts from "@pages/EvaluationAccounts/EvaluationAccounts";
import FundedAccountDetail from "@pages/FundedAccounts/FundedAccountDetail/FundedAccountDetail";
import FundedAccounts from "@pages/FundedAccounts/FundedAccounts";
import Journal from "@pages/Journal/Journal";
import JournalEntry from "@pages/Journal/JournalEntry/JournalEntry";
import useLoginCheckApiCall from "@pages/Login/hooks/useLoginCheckApiCall";
import useLoginCheckHandler from "@pages/Login/hooks/useLoginCheckHandler";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import ResetPassword from "@pages/ResetPassword/ResetPassword";
import SignUp from "@pages/SignUp/SignUp";
import { isNotEmptyString } from "@utils/utils";
import React from "react";
import { Route, Routes } from "react-router";
import RequireAuth from "./RequireAuth";
import checkAuth from "./hooks/checkAuth";

const AppNavigation: React.FunctionComponent = (): React.ReactElement => {
  const { user, verificationError } = useLoginState();
  const { updateVerificationError } = useLoginDispatch();
  const loginCheckApiCall = useLoginCheckApiCall();
  const { loading } = loginCheckApiCall;
  useLoginCheckHandler(loginCheckApiCall);
  const verificationApiCall = useVerificationApiCall();
  useVerificationHandler(verificationApiCall);

  if (loading) return <LoadingPage />;

  return (
    <>
      <AlertPopout
        hideDuration={4000}
        open={isNotEmptyString(verificationError)}
        message={verificationError}
        setPopoutOpen={() => updateVerificationError("")}
      />
      <Routes>
        {/* Public routes */}
        <Route path={PageEnum.Login} element={checkAuth({ user })} />
        <Route path={PageEnum.SignUp} element={<SignUp />} />
        <Route path={PageEnum.ResetPassword} element={<ResetPassword />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path={PageEnum.Dashboard} element={<Dashboard />} />
          <Route path={PageEnum.FundedAccounts} element={<FundedAccounts />} />
          <Route
            path={PageEnum.EvaluationAccounts}
            element={<EvaluationAccounts />}
          />
          <Route
            path={PageEnum.FundedAccountDetail}
            element={<FundedAccountDetail />}
          />
          <Route
            path={PageEnum.EvaluationAccountDetail}
            element={<EvaluationAccountDetail />}
          />
          <Route path={PageEnum.Journal} element={<Journal />} />
          <Route path={PageEnum.JournalEntry} element={<JournalEntry />} />
        </Route>
        {/* Root */}
        <Route path="/" element={checkAuth({ user })} />
        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppNavigation;
