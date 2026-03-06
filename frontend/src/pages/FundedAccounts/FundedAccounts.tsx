import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";
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
import AddFundedAccountsModal from "./AddFundedAccountModal/AddFundedAccountsModal";
import AddTradingDayModal from "./AddTradingDayModal/AddTradingDayModal";

const FundedAccounts: React.FunctionComponent = () => {
  const fundedStatsSummaryDetails = useGetFundedAccountsStatsSummaryDetails();
  const firmsList = ["My Funded Futures", "Apex", "Bulenox", "Alpha Futures"];
  const accountTemplateList = [
    "MFFU 50k Flex",
    "MFFU 50k Rapid",
    "Apex 50k",
    "Bulenox 50k",
    "Alpha Futures Zero 50k",
  ];

  const bufferState = ["< 20%", "> 50%", "> 90%", "Complete"];
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [addTradingDayOpen, setAddTradingDayOpen] =
    React.useState<boolean>(false);

  const accountsList = useGetFundedAccountsList();
  return (
    <Page topBarShowMenu={true}>
      <AddTradingDayModal
        modalOpen={addTradingDayOpen}
        setModalOpen={setAddTradingDayOpen}
      />
      <AddFundedAccountsModal
        accountTemplates={accountTemplateList}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setAddTradingDayOpen={setAddTradingDayOpen}
      />
      <Container>
        <Title>Funded Accounts</Title>
        <StatsSummary
          statsSummaryTilesDetails={fundedStatsSummaryDetails}
          featureTiles
        />
        <Gap level={2} />
        <DropdownsSection>
          <DropdownMultiselect
            items={firmsList.concat(firmsList)}
            title="All Firms"
          />
          <DropdownMultiselect items={bufferState} title="Buffer Built" />
          <Button
            text={"Add Funded"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
            onClick={(): void => setModalOpen(true)}
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
            <ListItem
              key={index}
              {...account}
              openAddTradingDayModal={setAddTradingDayOpen}
            />
          ))}
        </ListContainer>
      </Container>
    </Page>
  );
};

export default FundedAccounts;
