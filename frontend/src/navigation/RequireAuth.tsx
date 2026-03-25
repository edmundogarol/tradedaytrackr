import LoadingPage from "@components/Loading/LoadingPage";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { Navigate, Outlet } from "react-router";

const RequireAuth = ({ loading }: { loading: boolean }): React.ReactElement => {
  const { user } = useLoginState();

  if (loading) return <LoadingPage />;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default RequireAuth;
