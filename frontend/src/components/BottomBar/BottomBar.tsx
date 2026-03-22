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
      <span
        style={{
          borderRight: "1px solid grey",
          paddingRight: 10,
          marginRight: 5,
        }}
      >
        © 2026 TradeDayTrackR. All rights reserved.
      </span>
      <div>
        <Link to="/help">Help</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contactUs">Contact Us</Link>
      </div>
    </Container>
  );
};

export default BottomBar;
