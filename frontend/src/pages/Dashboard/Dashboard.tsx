import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import { DashboardContainer } from "./DashboardStyledComponents";

const Dashboard: React.FunctionComponent = () => {
  return (
    <Page>
      <DashboardContainer>
        <Gap level={1} />
      </DashboardContainer>
    </Page>
  );
};

export default Dashboard;
