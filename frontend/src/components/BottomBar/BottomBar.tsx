import { PageEnum } from "@interfaces/NavigationTypes";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={PageEnum.PrivacyPolicy}>Privacy Policy</Link>
        <Link to={PageEnum.TermsOfService}>Terms of Service</Link>
        <Link to={PageEnum.FrequentlyAskedQuestions}>FAQ</Link>
        <Link to={PageEnum.ContactUs}>Contact Us</Link>
        <Link
          to="https://www.instagram.com/tradedaytrackr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </Link>
        <Link
          to="https://www.facebook.com/tradedaytrackr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </Link>
        <Link
          to="https://www.x.com/tradedaytrackr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <XIcon />
        </Link>
        <Link
          to="https://www.threads.com/@tradedaytrackr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AlternateEmailIcon />
        </Link>
      </div>
    </Container>
  );
};
export default BottomBar;
