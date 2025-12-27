import React from "react";
import { Else, If } from "@components/If/If";
import useLoginState from "@pages/Login/hooks/useLoginState";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import UnauthenticatedNavigator from "./UnauthenticatedNavigator";

const AppNavigation: React.FunctionComponent = (): React.ReactElement => {
  const { user } = useLoginState();
  return (
    <If condition={user?.logged_in}>
      <AuthenticatedNavigator />
      <Else>
        <UnauthenticatedNavigator />
      </Else>
    </If>
  );
};
export default AppNavigation;
