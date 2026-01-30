import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import {
  FundedAccountsContainer,
  FundedAccountsTitle,
} from "./FundedAccountsStyledComponents";
import useGetFundedAccountsStatsSummaryDetails from "./hooks/useGetFundedAccountsStatsSummaryDetails";

const FundedAccounts: React.FunctionComponent = () => {
  const fundedStatsSummaryDetails = useGetFundedAccountsStatsSummaryDetails();

  return (
    <Page topBarShowMenu={true}>
      <FundedAccountsContainer>
        <FundedAccountsTitle>Funded Accounts</FundedAccountsTitle>
        <StatsSummary
          statsSummaryTilesDetails={fundedStatsSummaryDetails}
          featureTiles
        />
      </FundedAccountsContainer>
    </Page>
  );
};

export default FundedAccounts;
