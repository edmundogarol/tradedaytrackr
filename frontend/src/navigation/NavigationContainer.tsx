import React from "react";
import { BrowserRouter } from "react-router";
import AppNavigation from "./AppNavigation";

const NavigationContainer: React.FC = () => {
  return (
    <BrowserRouter>
      <AppNavigation />
    </BrowserRouter>
  );
};

export default NavigationContainer;
