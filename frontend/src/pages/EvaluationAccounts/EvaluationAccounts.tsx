import Button from "@components/Button/Button";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";
import Gap from "@components/Gap/Gap";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import type { EvaluationAccount } from "@interfaces/CustomTypes";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import useGetTradingAccountsHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountsHandler";
import useSettingsState from "@pages/Settings/hooks/useSettingsState";
import useGetAccountTemplatesHandler from "@pages/Settings/Preferences/hooks/useGetAccountTemplatesHandler";
import { uniqBy } from "lodash";
import React, { useEffect } from "react";
import AddEvaluationAccountsModal from "./AddEvaluationAccountModal/AddEvaluationAccountsModal";
import AddTradingDayModal from "./AddEvaluationTradingDayModal/AddTradingDayModal";
import ListItem from "./EvaluationAccountsListItem";
import {
  AccountHeader,
  BufferHeader,
  Container,
  DaysHeader,
  DropdownsSection,
  ListContainer,
  ListHeaders,
  PnLHeader,
  Title,
} from "./EvaluationAccountsStyledComponents";
import styles from "./EvaluationAccountsStyles";
import { EvalProgressStatus } from "./hooks/useGetEvalProgressStatus";
import useGetEvaluationAccountsList from "./hooks/useGetEvaluationAccountsList";
import { useGetEvaluationAccountsStatsSummaryDetails } from "./hooks/useGetEvaluationAccountsStatsSummaryDetails";

const EvaluationAccounts: React.FunctionComponent = () => {
  const evaluationStatsSummaryDetails =
    useGetEvaluationAccountsStatsSummaryDetails();
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
    updateAddTradeModalOpen,
  } = useFundedAccountsDispatch();
  const { accountTemplates } = useSettingsState();
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
    if (tradingAccounts.length === 0) {
      getTradingAccounts();
    }
    if (accountTemplates.length === 0) {
      getAccountTemplates();
    }
  }, []);

  const bufferState = [
    EvalProgressStatus.Started,
    EvalProgressStatus.InProgress,
    EvalProgressStatus.OnTrack,
    EvalProgressStatus.NearPass,
    EvalProgressStatus.Complete,
  ];

  const accountsList = useGetEvaluationAccountsList();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [addTradingDayOpen, setAddTradingDayOpen] =
    React.useState<boolean>(false);
  return (
    <Page topBarShowMenu={true}>
      <AddTradingDayModal
        modalOpen={addTradingDayOpen}
        setModalOpen={setAddTradingDayOpen}
      />
      <AddEvaluationAccountsModal
        accountTemplates={[]}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setAddTradingDayOpen={setAddTradingDayOpen}
      />
      <Container>
        <Title>Evaluation Accounts</Title>
        <StatsSummary
          statsSummaryTilesDetails={evaluationStatsSummaryDetails}
          featureTiles
        />
        <Gap level={2} />
        <DropdownsSection>
          <DropdownMultiselect
            items={firmsList}
            title="All Firms"
            icon={<FilterAltIcon style={{ color: "#c0c0c0" }} />}
          />
          <DropdownMultiselect
            items={bufferState.map((status) => {
              return {
                name: status,
                value: status,
              };
            })}
            title="Status"
            icon={<FilterAltIcon style={{ color: "#c0c0c0" }} />}
          />
          <Button
            onClick={() => setModalOpen(true)}
            text={"Add Eval"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
          />
        </DropdownsSection>
        <ListHeaders>
          <AccountHeader>Account</AccountHeader>
          <DaysHeader>Trading Days</DaysHeader>
          <BufferHeader>Profit Target</BufferHeader>
          <PnLHeader>Status</PnLHeader>
        </ListHeaders>
        <ListContainer>
          {tradingAccounts
            .filter((account) => account.accountType.isEval)
            .filter(
              (account) =>
                firmFilter.length === 0 ||
                firmFilter.includes(account.accountType.firm),
            )
            .map((account, index) => (
              <ListItem
                key={index}
                account={account as EvaluationAccount}
                openAddTradingDayModal={setAddTradingDayOpen}
              />
            ))}
        </ListContainer>
      </Container>
    </Page>
  );
};

export default EvaluationAccounts;
