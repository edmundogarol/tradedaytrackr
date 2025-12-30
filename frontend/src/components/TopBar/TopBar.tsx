import React from "react";
import { If } from "@components/If/If";
import { imageSrc } from "@utils/utils";
import { Link } from "react-router";
import { TopBarContainer, TopBarHomeLogo } from "./TopBarStyledComponents";

export interface TopBarProps {
  transparent?: boolean;
  homeLogo?: boolean;
  topBarShowMenu?: boolean;
}

const TopBar: React.FunctionComponent<TopBarProps> = ({
  transparent,
  homeLogo,
  topBarShowMenu,
}) => {
  return (
    <TopBarContainer $transparent={transparent}>
      <If condition={homeLogo}>
        <Link to="/">
          <TopBarHomeLogo
            src={imageSrc("tradedaytrackr_full_no_background.svg")}
            alt="Home Logo"
          />
        </Link>
      </If>
      <If condition={topBarShowMenu}>{/* Menu component can go here */}</If>
    </TopBarContainer>
  );
};

export default TopBar;
