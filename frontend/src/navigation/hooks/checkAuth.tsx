import LoadingPage from "@components/Loading/LoadingPage";
import { PageEnum } from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import { Navigate } from "react-router";

const checkAuth = ({ user, isHydrated }: any): React.ReactElement => {
  if (!isHydrated) return <LoadingPage />;

  return user.logged_in ? (
    <Navigate to={PageEnum.Dashboard} replace />
  ) : (
    <Login />
  );
};
export default checkAuth;
