import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";

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
  const bufferState = [
    EvalProgressStatus.Started,
    EvalProgressStatus.InProgress,
    EvalProgressStatus.OnTrack,
    EvalProgressStatus.NearPass,
    EvalProgressStatus.Complete,
  ];
  const accountsList = useGetEvaluationAccountsList();

  return (
    <Page topBarShowMenu={true}>
      <Container>
        <Title>Evaluation Accounts</Title>
        <StatsSummary
          statsSummaryTilesDetails={evaluationStatsSummaryDetails}
          featureTiles
        />
        <Gap level={2} />
        <DropdownsSection>
          <DropdownMultiselect items={firmsList} title="All Firms" />
          <DropdownMultiselect items={bufferState} title="Status" />
        </DropdownsSection>
        <ListHeaders>
          <AccountHeader>Account</AccountHeader>
          <DaysHeader>Trading Days</DaysHeader>
          <BufferHeader>Profit Target</BufferHeader>
          <PnLHeader>Status</PnLHeader>
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

export default EvaluationAccounts;
