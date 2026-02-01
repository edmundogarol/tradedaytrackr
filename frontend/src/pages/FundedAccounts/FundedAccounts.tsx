import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";
import { color } from "@styles/colors";
import Button from "@components/Button/Button";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
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
import styles from "./FundedAccountsStyles";

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
          <DropdownMultiselect items={firmsList} title="All Firms" />
          <DropdownMultiselect items={bufferState} title="Buffer Built" />
          <Button
            text={"Add Funded"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
          />
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
