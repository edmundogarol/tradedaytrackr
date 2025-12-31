import React from "react";
import { If } from "@components/If/If";
import { imageSrc } from "@utils/utils";
import { Link } from "react-router";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { TopBarContainer, TopBarHomeLogo } from "./TopBarStyledComponents";
import TopBarMenu from "./TopBarMenu/TopBarMenu";

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
  const { user } = useLoginState();

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
      <If condition={topBarShowMenu}>
        <TopBarMenu user={user} />
      </If>
    </TopBarContainer>
  );
};

export default TopBar;
