import React from "react";
import { BrowserRouter } from "react-router";
import AuthenticatedNavigator from "./AuthenticatedNavigator";

const NavigationContainer: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthenticatedNavigator />
    </BrowserRouter>
  );
};

export default NavigationContainer;
