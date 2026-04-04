import { If } from "@components/If/If";
import { PageEnum } from "@interfaces/NavigationTypes";
import InfoIcon from "@mui/icons-material/Info";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { imageSrc } from "@utils/utils";
import React from "react";
import { Link } from "react-router";
import TopBarMenu from "./TopBarMenu/TopBarMenu";
import {
  AlertMenuContainer,
  Container,
  HomeLogo,
  TopBarAlertContainer,
} from "./TopBarStyledComponents";

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
    <Container $transparent={transparent}>
      <If condition={homeLogo}>
        <Link to="/">
          <HomeLogo
            src={imageSrc("tradedaytrackr_full_no_background.svg")}
            alt="Home Logo"
          />
        </Link>
      </If>
      <If condition={topBarShowMenu}>
        <AlertMenuContainer>
          <TopBarAlertContainer>
            <InfoIcon style={{ height: 20, width: 20, color: "white" }} />
            <span>
              AI Feature Available: Create or edit{" "}
              <Link
                style={{ color: "white" }}
                to={PageEnum.JournalEntry + "?id=new"}
              >
                Journal Entry
              </Link>{" "}
              to use auto tag detection or draft creator
            </span>
          </TopBarAlertContainer>
          <TopBarMenu user={user} />
        </AlertMenuContainer>
      </If>
    </Container>
  );
};

export default TopBar;
