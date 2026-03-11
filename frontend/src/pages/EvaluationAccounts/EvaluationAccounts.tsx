import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
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
} from "./EvaluationAccountsStyledComponents";
import { useGetEvaluationAccountsStatsSummaryDetails } from "./hooks/useGetEvaluationAccountsStatsSummaryDetails";
import useGetEvaluationAccountsList from "./hooks/useGetEvaluationAccountsList";
import ListItem from "./EvaluationAccountsListItem";
import { EvalProgressStatus } from "./hooks/useGetEvalProgressStatus";
import styles from "./EvaluationAccountsStyles";
import AddTradingDayModal from "./AddEvaluationTradingDayModal/AddTradingDayModal";
import AddEvaluationAccountsModal from "./AddEvaluationAccountModal/AddEvaluationAccountsModal";

const EvaluationAccounts: React.FunctionComponent = () => {
  const evaluationStatsSummaryDetails =
    useGetEvaluationAccountsStatsSummaryDetails();
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
  const accountTemplateList = [
    "MFFU 50k Flex",
    "MFFU 50k Rapid",
    "Apex 50k",
    "Bulenox 50k",
    "Alpha Futures Zero 50k",
  ];
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
        accountTemplates={accountTemplateList}
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
            items={bufferState}
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

export default EvaluationAccounts;
