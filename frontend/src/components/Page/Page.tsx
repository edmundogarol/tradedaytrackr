import React from "react";
import { If } from "@components/If/If";
import TopBar from "@components/TopBar/TopBar";
import BottomBar from "@components/BottomBar/BottomBar";
import SideDrawer from "@components/SideDrawer/SideDrawer";
import { ChildrenContainer, PageContainer } from "./PageStyledComponents";

export interface PageProps {
  children?: React.ReactNode;
  topBar?: boolean;
  topBarShowMenu?: boolean;
  bottomBar?: boolean;
  sideDrawer?: boolean;
}

const Page: React.FunctionComponent<PageProps> = ({
  children,
  topBar = true,
  topBarShowMenu = false,
  bottomBar = true,
  sideDrawer = true,
}) => {
  return (
    <PageContainer $withSideDrawer={sideDrawer}>
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
    </PageContainer>
  );
};

export default Page;
