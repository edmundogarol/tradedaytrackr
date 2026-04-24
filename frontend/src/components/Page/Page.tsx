import BottomBar from "@components/BottomBar/BottomBar";
import { If } from "@components/If/If";
import SideDrawer from "@components/SideDrawer/SideDrawer";
import TopBar from "@components/TopBar/TopBar";
import useSettingsState from "@pages/Settings/hooks/useSettingsState";
import { color } from "@styles/colors";
import React from "react";
import { ChildrenContainer, Container } from "./PageStyledComponents";

export interface PageProps {
  children?: React.ReactNode;
  topBar?: boolean;
  topBarShowMenu?: boolean;
  bottomBar?: boolean;
  sideDrawer?: boolean;
  backgroundColor?: {
    light: string;
    dark: string;
  };
}

const Page: React.FunctionComponent<PageProps> = ({
  children,
  topBar = true,
  topBarShowMenu = false,
  bottomBar = true,
  sideDrawer = true,
  backgroundColor,
}) => {
  const { drawerOpen } = useSettingsState();
  return (
    <Container
      $drawerOpen={drawerOpen}
      $withSideDrawer={sideDrawer}
      $backgroundColor={{
        $light: backgroundColor?.light || color("SystemBackground2"),
        $dark: backgroundColor?.dark || color("SystemBackground"),
      }}
    >
      <If condition={sideDrawer}>
        <SideDrawer />
      </If>
      <If condition={topBar}>
        <TopBar transparent homeLogo topBarShowMenu={topBarShowMenu} />
      </If>
      <ChildrenContainer>{children}</ChildrenContainer>
      <If condition={bottomBar}>
        <BottomBar transparent />
      </If>
    </Container>
  );
};

export default Page;
