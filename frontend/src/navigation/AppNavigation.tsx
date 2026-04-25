import AlertPopout from "@components/Alert/AlertPopout";
import LoadingPage from "@components/Loading/LoadingPage";
import ModalWrapper from "@components/Modal/Modal";
import PageNotFound from "@components/PageNotFound/PageNotFound";
import useVerificationApiCall from "@hooks/account/useVerificationApiCall";
import useVerificationHandler from "@hooks/account/useVerificationHandler";
import { PageEnum } from "@interfaces/NavigationTypes";
import Calendar from "@pages/Calendar/Calendar";
import Dashboard from "@pages/Dashboard/Dashboard";
import EvaluationAccountDetail from "@pages/EvaluationAccounts/EvaluationAccountDetail/EvaluationAccountDetail";
import EvaluationAccounts from "@pages/EvaluationAccounts/EvaluationAccounts";
import FundedAccountDetail from "@pages/FundedAccounts/FundedAccountDetail/FundedAccountDetail";
import FundedAccounts from "@pages/FundedAccounts/FundedAccounts";
import ContactUs from "@pages/Info/ContactUs/ContactUs";
import FAQ from "@pages/Info/FAQ";
import PrivacyPolicy from "@pages/Info/PrivacyPolicy";
import TermsOfService from "@pages/Info/TermsOfService";
import Journal from "@pages/Journal/Journal";
import JournalEntry from "@pages/Journal/JournalEntry/JournalEntry";
import Login from "@pages/Login/Login";
import useLoginCheckApiCall from "@pages/Login/hooks/useLoginCheckApiCall";
import useLoginCheckHandler from "@pages/Login/hooks/useLoginCheckHandler";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useSetCSRFApiCall from "@pages/Login/hooks/useSetCSRFApiCall";
import Payouts from "@pages/Payouts/Payouts";
import Reports from "@pages/Reports/Reports";
import ConfirmPassword from "@pages/ResetPassword/ConfirmPassword/ConfirmPassword";
import ResetPassword from "@pages/ResetPassword/ResetPassword";
import Account from "@pages/Settings/Account/Account";
import Billing from "@pages/Settings/Billing/Billing";
import Preferences from "@pages/Settings/Preferences/Preferences";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import useSettingsState from "@pages/Settings/hooks/useSettingsState";
import SignUp from "@pages/SignUp/SignUp";
import { SectionText } from "@styles/globalStyledComponents";
import { isNotEmptyString, setTimezone } from "@utils/utils";
import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router";
import RequireAuth from "./RequireAuth";
import checkAuth from "./hooks/checkAuth";

const AppNavigation: React.FunctionComponent = (): React.ReactElement => {
  const { user, verificationError, isHydrated, deleteAccountError } =
    useLoginState();
  const { updateVerificationError, updateDeleteAccountError } =
    useLoginDispatch();
  const loginCheckApiCall = useLoginCheckApiCall();
  const { loading } = loginCheckApiCall;
  useLoginCheckHandler(loginCheckApiCall);
  const verificationApiCall = useVerificationApiCall();
  useVerificationHandler(verificationApiCall);
  const { fetch: fetchCSRF } = useSetCSRFApiCall();
  const { systemAlert } = useSettingsState();
  const { updateSystemAlert } = useSettingsDispatch();

  useEffect(() => {
    if (!document.cookie.includes("csrftoken")) {
      fetchCSRF();
    }
  }, []);

  useEffect(() => {
    if (user?.timezone) {
      setTimezone(user.timezone);
    }
  }, [user?.timezone]);

  const noMembershipBlockRoutes = [
    PageEnum.Dashboard,
    PageEnum.AccountSettings,
    PageEnum.Billing,
    PageEnum.FundedAccounts,
    PageEnum.EvaluationAccounts,
    PageEnum.PayoutTracking,
    PageEnum.Calendar,
    PageEnum.Journal,
    PageEnum.PageNotFound,
    PageEnum.Landing,
    PageEnum.Login,
  ];
  const isOnNoMembershipBlockRoute = noMembershipBlockRoutes.some((route) =>
    window.location.pathname.includes(route),
  );
  const modalBlockerOpen =
    user.logged_in &&
    !user.is_demo &&
    !user?.membership_active &&
    !isOnNoMembershipBlockRoute;

  return (
    <>
      {loading && <LoadingPage />}
      <ModalWrapper
        hideCloseIcon
        open={modalBlockerOpen}
        setOpen={() => {}}
        title="Membership Required"
      >
        <SectionText>
          Please activate your membership to access all features. Or explore
          features through the Demo Account login.
        </SectionText>
        <SectionText>
          <Link
            style={{
              color: "#bfbfbf",
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: 5,
            }}
            to={PageEnum.Billing}
          >
            Manage your subscription
          </Link>
        </SectionText>
      </ModalWrapper>
      <AlertPopout
        hideDuration={3000}
        open={!!systemAlert.message}
        message={systemAlert.message}
        setPopoutOpen={() => updateSystemAlert({})}
      />
      <AlertPopout
        hideDuration={4000}
        open={isNotEmptyString(verificationError)}
        message={verificationError}
        setPopoutOpen={() => updateVerificationError("")}
      />
      <AlertPopout
        hideDuration={4000}
        open={isNotEmptyString(deleteAccountError)}
        message={deleteAccountError}
        setPopoutOpen={() => updateDeleteAccountError("")}
      />
      <Routes>
        {/* Public routes */}
        <Route
          path={PageEnum.Landing}
          element={checkAuth({ user, isHydrated })}
        />
        <Route path={PageEnum.Login} element={<Login />} />
        <Route path={PageEnum.SignUp} element={<SignUp />} />
        <Route path={PageEnum.ResetPassword} element={<ResetPassword />} />
        <Route
          path={PageEnum.ResetPasswordConfirmation}
          element={<ConfirmPassword />}
        />
        <Route path={PageEnum.PrivacyPolicy} element={<PrivacyPolicy />} />
        <Route path={PageEnum.TermsOfService} element={<TermsOfService />} />
        <Route path={PageEnum.FrequentlyAskedQuestions} element={<FAQ />} />
        <Route path={PageEnum.ContactUs} element={<ContactUs />} />

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
          <Route path={PageEnum.PayoutTracking} element={<Payouts />} />
          <Route path={PageEnum.Calendar} element={<Calendar />} />
          <Route path={PageEnum.Reports} element={<Reports />} />
          <Route path={PageEnum.AccountSettings} element={<Account />} />
          <Route path={PageEnum.Preferences} element={<Preferences />} />
          <Route path={PageEnum.Billing} element={<Billing />} />
        </Route>
        <Route
          index
          element={
            user.logged_in ? (
              <Navigate to={PageEnum.Dashboard} replace />
            ) : (
              <Navigate to={PageEnum.Landing} replace />
            )
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppNavigation;
