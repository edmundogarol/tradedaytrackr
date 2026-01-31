import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import Dropdown from "@components/Dropdown/Dropdown";
import {
  Container,
  DropdownsSection,
  ListContainer,
  ListHeaders,
  AccountHeader,
  BufferHeader,
  DaysHeader,
  PnLHeader,
  Title,
} from "./FundedAccountsStyledComponents";
import useGetFundedAccountsStatsSummaryDetails from "./hooks/useGetFundedAccountsStatsSummaryDetails";
import useGetFundedAccountsList from "./hooks/useGetFundedAccountsList";
import ListItem from "./FundedAccountsListItem";

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
      <Container>
        <Title>Funded Accounts</Title>
        <StatsSummary
          statsSummaryTilesDetails={fundedStatsSummaryDetails}
          featureTiles
        />
        <Gap level={2} />
        <DropdownsSection>
          <Dropdown items={firmsList} title="All Firms" />
          <Dropdown items={bufferState} title="Buffer Built" />
        </DropdownsSection>
        <ListHeaders>
          <AccountHeader>Account</AccountHeader>
          <DaysHeader>Trading Days</DaysHeader>
          <BufferHeader>Min Buffer</BufferHeader>
          <PnLHeader>PnL</PnLHeader>
        </ListHeaders>
        <ListContainer>
          {accountsList.map((account, index) => (
            <ListItem key={index} {...account} />
          ))}
        </ListContainer>
      </Container>
    </Page>
  );
};

export default FundedAccounts;
