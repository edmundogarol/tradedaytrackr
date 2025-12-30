import React from "react";
import { imageSrc } from "@utils/utils";
import { Link } from "react-router";
import Page from "@components/Page/Page";
import {
  PageNotFoundContainer,
  PageNotFoundLogo,
  PageNotFoundSubText,
  PageNotFoundText,
} from "./PageNotFoundStyledComponents";

const PageNotFound: React.FunctionComponent = () => {
  return (
    <Page bottomBar={false}>
      <PageNotFoundContainer>
        <Link to="/">
          <PageNotFoundLogo
            src={imageSrc("page_not_found.png")}
            alt="Home Logo"
          />
        </Link>
        <PageNotFoundText>404 - Page Not Found</PageNotFoundText>
        <PageNotFoundSubText>
          The page you are looking for does not exist.
        </PageNotFoundSubText>
      </PageNotFoundContainer>
    </Page>
  );
};

export default PageNotFound;
