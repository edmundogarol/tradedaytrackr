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
import { uniqBy } from "lodash";
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
  const bufferState = [
    {
      name: "< 20%",
      value: "<20",
    },
    {
      name: "< 50%",
      value: "<50",
    },
    {
      name: "> 50%",
      value: ">50",
    },
    {
      name: "> 90%",
      value: ">90",
    },
    {
      name: "Complete",
      value: "complete",
    },
  ];
  const [addTradingDayOpen, setAddTradingDayOpen] =
    React.useState<boolean>(false);
  const {
    tradingAccounts,
    deleteTradingAccountErrors,
    createTradingAccountErrors,
    firmFilter,
    bufferFilter,
  } = useFundedAccountsState();
  const {
    updateCreateTradingAccountModalOpen,
    updateCreateTradingAccountErrors,
    updateDeleteTradingAccountErrors,
    updateFirmFilter,
    updateBufferFilter,
  } = useFundedAccountsDispatch();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  const firmsList = uniqBy(
    tradingAccounts.map((account) => {
      return {
        name: account.accountType.firm,
        value: account.accountType.firm,
      };
    }),
    "value",
  );

  useEffect(() => {
    getAccountTemplates();
    getTradingAccounts();
  }, []);

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        message={deleteTradingAccountErrors.detail}
        hideDuration={3000}
        open={!!deleteTradingAccountErrors.detail}
        setPopoutOpen={() => updateDeleteTradingAccountErrors({})}
      />
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
      <AddFundedAccountsModal setAddTradingDayOpen={setAddTradingDayOpen} />
      <Container>
        <SectionTitle>Funded Accounts</SectionTitle>
        <StatsSummary
          statsSummaryTilesDetails={fundedStatsSummaryDetails}
          featureTiles
        />
        <Gap level={2} />
        <DropdownsSection>
          <DropdownMultiselect
            items={firmsList}
            onSelect={(selected) => updateFirmFilter(selected)}
            title="All Firms"
            icon={<FilterAltIcon style={{ color: "#c0c0c0" }} />}
          />
          <DropdownMultiselect
            items={bufferState}
            onSelect={(selected) => updateBufferFilter(selected)}
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
          {tradingAccounts
            .filter(
              (account) =>
                firmFilter.length === 0 ||
                firmFilter.includes(account.accountType.firm),
            )
            .filter((account) => {
              if (bufferFilter.length === 0) {
                return true;
              }

              const bufferPercent = account.bufferPercent;

              return bufferFilter.some((filter) => {
                if (filter === "<20") {
                  return bufferPercent < 20;
                }
                if (filter === "<50") {
                  return bufferPercent < 50;
                }
                if (filter === ">50") {
                  return bufferPercent > 50;
                }
                if (filter === ">90") {
                  return bufferPercent > 90;
                }
                if (filter === "complete") {
                  return bufferPercent === 100;
                }
                return false;
              });
            })
            .map((account, index) => (
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
