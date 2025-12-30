import React from "react";
import { BottomBarContainer, BottomBarLink } from "./BottomBarStyledComponents";

export interface BottomBarProps {
  transparent?: boolean;
}

const BottomBar: React.FunctionComponent<BottomBarProps> = ({
  transparent = false,
}) => {
  return (
    <BottomBarContainer $transparent={transparent}>
      <BottomBarLink to="/help">Help</BottomBarLink>
      <BottomBarLink to="/faq">FAQ</BottomBarLink>
      <BottomBarLink to="/contactUs">Contact Us</BottomBarLink>
    </BottomBarContainer>
  );
};

export default BottomBar;
