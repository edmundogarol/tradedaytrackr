import LoadingPage from "@components/Loading/LoadingPage";
import { PageEnum } from "@interfaces/NavigationTypes";
import Landing from "@pages/Landing/Landing";
import { Navigate } from "react-router";

const checkAuth = ({ user, isHydrated }: any): React.ReactElement => {
  if (!isHydrated) return <LoadingPage />;

  return user.logged_in ? (
    <Navigate to={PageEnum.Dashboard} replace />
  ) : (
    <Landing />
  );
};
export default checkAuth;
