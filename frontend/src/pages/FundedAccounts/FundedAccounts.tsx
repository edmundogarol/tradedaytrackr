import AlertPopout from "@components/Alert/AlertPopout";
import Button from "@components/Button/Button";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";
import Gap from "@components/Gap/Gap";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import useGetAccountTemplatesHandler from "@pages/Settings/Preferences/hooks/useGetAccountTemplatesHandler";
import { SectionTitle } from "@styles/globalStyledComponents";
import React, { useEffect } from "react";
import AddFundedAccountsModal from "./AddFundedAccountModal/AddFundedAccountsModal";
import AddTradingDayModal from "./AddTradingDayModal/AddTradingDayModal";
import ListItem from "./FundedAccountsListItem";
import {
  AccountHeader,
  BufferHeader,
  Container,
  DaysHeader,
  DropdownsSection,
  ListContainer,
  ListHeaders,
  PnLHeader,
} from "./FundedAccountsStyledComponents";
import styles from "./FundedAccountsStyles";
import useFundedAccountsDispatch from "./hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "./hooks/useFundedAccountsState";
import useGetFundedAccountsStatsSummaryDetails from "./hooks/useGetFundedAccountsStatsSummaryDetailsMock";
import useGetTradingAccountsHandler from "./hooks/useGetTradingAccountsHandler";

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
  const [addTradingDayOpen, setAddTradingDayOpen] =
    React.useState<boolean>(false);
  const {
    tradingAccounts,
    createTradingAccountModalOpen,
    createTradingAccountErrors,
  } = useFundedAccountsState();
  const {
    updateCreateTradingAccountModalOpen,
    updateCreateTradingAccountErrors,
  } = useFundedAccountsDispatch();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  const { getTradingAccounts } = useGetTradingAccountsHandler();

  useEffect(() => {
    getAccountTemplates();
    getTradingAccounts();
  }, []);

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        message={createTradingAccountErrors.detail}
        hideDuration={3000}
        open={!!createTradingAccountErrors.detail}
        setPopoutOpen={() => updateCreateTradingAccountErrors({})}
      />
      <AddTradingDayModal
        modalOpen={addTradingDayOpen}
        setModalOpen={setAddTradingDayOpen}
      />
      <AddFundedAccountsModal
        accountTemplates={accountTemplateList}
        setAddTradingDayOpen={setAddTradingDayOpen}
      />
      <Container>
        <SectionTitle>Funded Accounts</SectionTitle>
        <StatsSummary
          statsSummaryTilesDetails={fundedStatsSummaryDetails}
          featureTiles
        />
        <Gap level={2} />
        <DropdownsSection>
          <DropdownMultiselect
            items={firmsList.concat(firmsList)}
            title="All Firms"
            icon={<FilterAltIcon style={{ color: "#c0c0c0" }} />}
          />
          <DropdownMultiselect
            items={bufferState}
            title="Buffer Built"
            icon={<FilterAltIcon style={{ color: "#c0c0c0" }} />}
          />
          <Button
            text={"Add Funded"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
            onClick={(): void => updateCreateTradingAccountModalOpen(true)}
          />
        </DropdownsSection>
        <ListHeaders>
          <AccountHeader>Account</AccountHeader>
          <DaysHeader>Trading Days</DaysHeader>
          <BufferHeader>Min Buffer</BufferHeader>
          <PnLHeader>Withdrawable</PnLHeader>
        </ListHeaders>
        <ListContainer>
          {tradingAccounts.map((account, index) => (
            <ListItem
              key={index}
              account={account}
              openAddTradingDayModal={setAddTradingDayOpen}
            />
          ))}
        </ListContainer>
      </Container>
    </Page>
  );
};

export default FundedAccounts;
