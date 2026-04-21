import LoadingPage from "@components/Loading/LoadingPage";
import { PageEnum } from "@interfaces/NavigationTypes";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { Navigate, Outlet } from "react-router";

const RequireAuth = (): React.ReactElement => {
  const { user, isHydrated } = useLoginState();

  if (!isHydrated) {
    return <LoadingPage />;
  }

  if (!user.logged_in) {
    return <Navigate to={PageEnum.Landing} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
