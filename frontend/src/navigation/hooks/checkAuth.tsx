import LoadingPage from "@components/Loading/LoadingPage";
import type { User } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import { Navigate } from "react-router";

const checkAuth = ({
  user,
  loading,
}: {
  user: User;
  loading: boolean;
}): React.ReactElement => {
  if (loading) return <LoadingPage />;

  if (user) {
    return <Navigate to={PageEnum.Dashboard} replace />;
  }

  return <Login />;
};

export default checkAuth;
