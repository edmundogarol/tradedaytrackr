import React from "react";
import { Container, BottomBarLink as Link } from "./BottomBarStyledComponents";

export interface BottomBarProps {
  transparent?: boolean;
}

const BottomBar: React.FunctionComponent<BottomBarProps> = ({
  transparent = false,
}) => {
  return (
    <Container $transparent={transparent}>
      <span>© 2026 TradeDayTrackR. All rights reserved.</span>
      <Link to="/help">Help</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/contactUs">Contact Us</Link>
    </Container>
  );
};

export default BottomBar;
