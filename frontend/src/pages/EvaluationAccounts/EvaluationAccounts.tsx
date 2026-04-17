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
import { useGetEvaluationAccountsStatsSummaryDetails } from "./hooks/useGetEvaluationAccountsStatsSummaryDetails";

const EvaluationAccounts: React.FunctionComponent = () => {
  const evaluationStatsSummaryDetails =
    useGetEvaluationAccountsStatsSummaryDetails();
  const {
    tradingAccounts,
    deleteTradingAccountErrors,
    createTradingAccountErrors,
    evalFirmFilter,
    evalStatusFilter,
  } = useFundedAccountsState();
  const {
    updateCreateTradingAccountModalOpen,
    updateCreateTradingAccountErrors,
    updateDeleteTradingAccountErrors,
    updateFirmFilter,
    updateBufferFilter,
    updateAddTradeModalOpen,
    updateEvalStatusFilter,
    updateEvalFirmFilter,
  } = useFundedAccountsDispatch();
  const { accountTemplates } = useSettingsState();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  const firmsList = uniqBy(
    tradingAccounts
      .filter((account) => account.accountType.isEval)
      .map((account) => {
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

  const statuses = [
    EvalProgressStatus.Started,
    EvalProgressStatus.InProgress,
    EvalProgressStatus.OnTrack,
    EvalProgressStatus.NearPass,
    EvalProgressStatus.Complete,
  ];

  return (
    <Page topBarShowMenu={true}>
      <AddTradingDayModal />
      <AddEvaluationAccountsModal />
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
            onSelect={(selected) => updateEvalFirmFilter(selected as string[])}
            icon={<FilterAltIcon style={{ color: "#c0c0c0" }} />}
          />
          <DropdownMultiselect
            items={statuses.map((status) => {
              return {
                name: status,
                value: status,
              };
            })}
            onSelect={(selected) =>
              updateEvalStatusFilter(selected as string[])
            }
            title="Status"
            icon={<FilterAltIcon style={{ color: "#c0c0c0" }} />}
          />
          <Button
            onClick={(): void => {
              updateCreateTradingAccountModalOpen(true);
            }}
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
          {(tradingAccounts as EvaluationAccount[])
            .filter((account) => account.accountType.isEval)
            .filter(
              (account) =>
                evalFirmFilter.length === 0 ||
                evalFirmFilter.includes(account.accountType.firm),
            )
            .filter((account) => {
              if (evalStatusFilter.length === 0) {
                return true;
              }
              const getProgress = (account: EvaluationAccount): number => {
                const profit =
                  Number(account.accountBalance) - Number(account.accountSize);

                if (!account.profitTarget) return 0;

                return (profit / Number(account.profitTarget)) * 100;
              };
              const progress = getProgress(account);

              return evalStatusFilter.some((filter) => {
                if (filter === EvalProgressStatus.Started)
                  return progress >= 0 && progress < 25;
                if (filter === EvalProgressStatus.InProgress)
                  return progress >= 25 && progress < 30;
                if (filter === EvalProgressStatus.OnTrack)
                  return progress >= 30 && progress < 60;
                if (filter === EvalProgressStatus.NearPass)
                  return progress >= 60 && progress < 100;
                if (filter === EvalProgressStatus.Complete)
                  return progress >= 100;
                return false;
              });
            })
            .map((account, index) => (
              <ListItem
                key={index}
                account={account as EvaluationAccount}
                openAddTradingDayModal={updateAddTradeModalOpen}
              />
            ))}
        </ListContainer>
      </Container>
    </Page>
  );
};

export default EvaluationAccounts;
