import Page from "@components/Page/Page";
import { imageSrc } from "@utils/utils";
import React from "react";
import { Link } from "react-router";
import { Container, Logo, SubText, Text } from "./PageNotFoundStyledComponents";

const PageNotFound: React.FunctionComponent = () => {
  return (
    <Page sideDrawer={false}>
      <Container>
        <Link to="/">
          <Logo src={imageSrc("page_not_found.png")} alt="Home Logo" />
        </Link>
        <Text>404 - Page Not Found</Text>
        <SubText>The page you are looking for does not exist.</SubText>
      </Container>
    </Page>
  );
};

export default PageNotFound;
