import Page from "@components/Page/Page";
import { PageContainer, SectionTitle } from "@styles/globalStyledComponents";
import React from "react";

const Payouts: React.FunctionComponent = () => {
  return (
    <Page topBarShowMenu={true}>
      <PageContainer>
        <SectionTitle>Payout Tracking</SectionTitle>
      </PageContainer>
    </Page>
  );
};

export default Payouts;
