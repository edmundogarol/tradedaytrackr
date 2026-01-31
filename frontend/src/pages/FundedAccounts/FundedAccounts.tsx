import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import Dropdown from "@components/Dropdown/Dropdown";
import {
  FundedAccountsContainer,
  FundedAccountsDropdownsSection,
  FundedAccountsListContainer,
  FundedAccountsListHeaders,
  FundedAccountsListHeadersAccount,
  FundedAccountsListHeadersBuffer,
  FundedAccountsListHeadersDays,
  FundedAccountsListHeadersPnL,
  FundedAccountsTitle,
} from "./FundedAccountsStyledComponents";
import useGetFundedAccountsStatsSummaryDetails from "./hooks/useGetFundedAccountsStatsSummaryDetails";
import useGetFundedAccountsList from "./hooks/useGetFundedAccountsList";
import FundedAccountsListItem from "./FundedAccountsListItem";

const FundedAccounts: React.FunctionComponent = () => {
  const fundedStatsSummaryDetails = useGetFundedAccountsStatsSummaryDetails();
  const firmsList = [
    "My Funded Futures",
    "Apex",
    "Bulenox",
    "Alpha Futures",
    "My Funded Futures",
    "Apex",
    "Bulenox",
    "Alpha Futures",
  ];
  const bufferState = ["< 20%", "> 50%", "> 90%", "Complete"];
  const accountsList = useGetFundedAccountsList();

  return (
    <Page topBarShowMenu={true}>
      <FundedAccountsContainer>
        <FundedAccountsTitle>Funded Accounts</FundedAccountsTitle>
        <StatsSummary
          statsSummaryTilesDetails={fundedStatsSummaryDetails}
          featureTiles
        />
        <Gap level={2} />
        <FundedAccountsDropdownsSection>
          <Dropdown items={firmsList} title="All Firms" />
          <Dropdown items={bufferState} title="Buffer Built" />
        </FundedAccountsDropdownsSection>
        <FundedAccountsListHeaders>
          <FundedAccountsListHeadersAccount>
            Account
          </FundedAccountsListHeadersAccount>
          <FundedAccountsListHeadersDays>
            Trading Days
          </FundedAccountsListHeadersDays>
          <FundedAccountsListHeadersBuffer>
            Min Buffer
          </FundedAccountsListHeadersBuffer>
          <FundedAccountsListHeadersPnL>PnL</FundedAccountsListHeadersPnL>
        </FundedAccountsListHeaders>
        <FundedAccountsListContainer>
          {accountsList.map((account, index) => (
            <FundedAccountsListItem key={index} {...account} />
          ))}
        </FundedAccountsListContainer>
      </FundedAccountsContainer>
    </Page>
  );
};

export default FundedAccounts;
