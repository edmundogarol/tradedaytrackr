import AlertPopout from "@components/Alert/AlertPopout";
import Button from "@components/Button/Button";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Page from "@components/Page/Page";
import type {
  EvaluationAccount,
  TradingAccount,
} from "@interfaces/CustomTypes";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EvaluationAccountsListItem from "@pages/EvaluationAccounts/EvaluationAccountsListItem";
import FundedAccountsListItem from "@pages/FundedAccounts/FundedAccountsListItem";
import { ListContainer } from "@pages/FundedAccounts/FundedAccountsStyledComponents";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import { BUTTON_WIDTH } from "@styles/constants";
import {
  PageContainer as Container,
  Section,
  SectionText,
  SectionTitle,
  Table,
  TableField,
  TableItem,
} from "@styles/globalStyledComponents";

import { PageEnum } from "@interfaces/NavigationTypes";
import { Pagination } from "@mui/material";
import ArchiveAccountModal from "@pages/FundedAccounts/ArchiveAccountModal/ArchiveAccountModal";
import DeleteTradingAccountModal from "@pages/FundedAccounts/DeleteTradingAccountModal/DeleteTradingAccountModal";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useGetArchivedTradingAccountsHandler from "@pages/FundedAccounts/hooks/useGetArchivedTradingAccountsHandler";
import { decimalStringToInt, formatter } from "@utils/utils";
import React, { useEffect, useState } from "react";
import { initialState } from "../SettingsState";
import useSettingsDispatch from "../hooks/useSettingsDispatch";
import useSettingsState from "../hooks/useSettingsState";
import AddAccountTemplateModal from "./AddAccountTemplateModal/AddAccountTemplateModal";
import AddTagModal from "./AddTagModal/AddTagModal";
import DeleteAccountTemplateModal from "./DeleteAccountTemplateModal/DeleteAccountTemplateModal";
import DeleteTagModal from "./DeleteTagModal/DeleteTagModal";
import {
  AccountTemplatesSection,
  SectionContainer,
  SubsectionHeaderWrapper,
  TagsSection,
} from "./PreferencesStyledComponents";
import useGetAccountTemplatesHandler from "./hooks/useGetAccountTemplatesHandler";
import useGetTagsHandler from "./hooks/useGetTagsHandler";

const Preferences: React.FunctionComponent = () => {
  const {
    updateSelectedAccountTemplate,
    updateAddAccountModalOpen,
    updateAddTagModalOpen,
    updateAccountTemplatesErrors,
    updateAddTagErrors,
    updateSelectedTag,
  } = useSettingsDispatch();
  const { accountTemplates, tags, addAccountTemplateErrors, addTagErrors } =
    useSettingsState();
  const { updateDeleteTradingAccountErrors } = useFundedAccountsDispatch();
  const {
    archivedTradingAccounts,
    archivedTradingAccountsItemCount,
    deleteTradingAccountErrors,
  } = useFundedAccountsState();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  const [deleteTemplateModalOpen, setDeleteTemplateModalOpen] = useState(false);
  const [deleteTagModalOpen, setDeleteTagModalOpen] = useState(false);
  const { getTags } = useGetTagsHandler();
  const { getArchivedTradingAccounts } = useGetArchivedTradingAccountsHandler();
  const [archivedTradingAccountsPage, setArchivedTradingAccountsPage] =
    useState(1);

  useEffect(() => {
    if (accountTemplates.length === 0) {
      getAccountTemplates();
    }
    if (tags.length === 0) {
      getTags();
    }
    if (archivedTradingAccounts.length === 0) {
      getArchivedTradingAccounts(archivedTradingAccountsPage);
    }
  }, []);

  useEffect(() => {
    if (addAccountTemplateErrors?.detail) {
      setDeleteTemplateModalOpen(false);
    }
    if (addTagErrors?.detail) {
      setDeleteTagModalOpen(false);
    }
  }, [addAccountTemplateErrors, addTagErrors]);

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        hideDuration={3000}
        open={deleteTradingAccountErrors?.detail}
        message={deleteTradingAccountErrors?.detail}
        setPopoutOpen={() => updateDeleteTradingAccountErrors({})}
      />
      <AlertPopout
        hideDuration={3000}
        open={addAccountTemplateErrors?.detail}
        message={addAccountTemplateErrors?.detail}
        setPopoutOpen={() => updateAccountTemplatesErrors({})}
      />
      <AlertPopout
        hideDuration={3000}
        open={addTagErrors?.detail}
        message={addTagErrors?.detail}
        setPopoutOpen={() => updateAddTagErrors({})}
      />
      <DeleteAccountTemplateModal
        deleteTemplateModalOpen={deleteTemplateModalOpen}
        setDeleteTemplateModalOpen={setDeleteTemplateModalOpen}
      />
      <DeleteTagModal
        deleteTagModalOpen={deleteTagModalOpen}
        setDeleteTagModalOpen={setDeleteTagModalOpen}
      />
      <ArchiveAccountModal unarchive />
      <DeleteTradingAccountModal redirect={PageEnum.Preferences} />
      <AddTagModal />
      <AddAccountTemplateModal />
      <Container>
        <SectionTitle>Settings</SectionTitle>
        <AccountTemplatesSection>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <SubsectionHeaderWrapper>
                <ArticleIcon style={{ color: "white", marginRight: 5 }} />
                Account Templates
                <Button
                  text="Add Template"
                  onClick={() => {
                    updateAddAccountModalOpen(true);
                    updateSelectedAccountTemplate(
                      initialState.selectedAccountTemplate,
                    );
                    updateAccountTemplatesErrors({});
                  }}
                  style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
                />
              </SubsectionHeaderWrapper>
              <SectionContainer>
                <SectionText>
                  Manage and create account templates for various prop account
                  rules and configurations.
                </SectionText>
                <Table>
                  <TableItem $header>
                    <TableField $flexSize={0.5}>Icon</TableField>
                    <TableField $flexSize={1.5}>Funded Template</TableField>
                    <TableField>Account Size</TableField>
                    <TableField>Min Days to Payout</TableField>
                    <TableField>Buffer Target</TableField>
                    <TableField $flexSize={0.5}>Manage</TableField>
                  </TableItem>
                  {accountTemplates
                    .filter((acc) => !acc.isEval)
                    .map((template, idx) => (
                      <TableItem key={template.name} $idx={idx}>
                        <TableField
                          $flexSize={0.5}
                          $src={template.displayImage}
                        ></TableField>
                        <TableField $flexSize={1.5}>{template.name}</TableField>
                        <TableField>
                          {formatter.format(template?.accountSize as number)}
                        </TableField>
                        <TableField>
                          {template.minTradingDays}{" "}
                          {`day${(template?.minTradingDays as number) > 1 ? "s" : ""}`}
                        </TableField>
                        <TableField>
                          {formatter.format(template.minBuffer as number)}
                        </TableField>
                        <TableField $flexSize={0.5}>
                          <InfoPopout infoDescription="Edit Template">
                            <EditIcon
                              onClick={() => {
                                updateSelectedAccountTemplate(template);
                                updateAddAccountModalOpen(true);
                              }}
                              style={{
                                height: 15,
                                width: 15,
                                cursor: "pointer",
                                pointerEvents: "auto",
                                marginLeft: 5,
                              }}
                            />
                          </InfoPopout>
                          <InfoPopout infoDescription="Delete Template">
                            <DeleteOutlineIcon
                              style={{
                                height: 15,
                                width: 15,
                                cursor: "pointer",
                                pointerEvents: "auto",
                                marginLeft: 5,
                              }}
                              onClick={() => {
                                updateSelectedAccountTemplate(template);
                                setDeleteTemplateModalOpen(true);
                              }}
                            />
                          </InfoPopout>
                        </TableField>
                      </TableItem>
                    ))}
                </Table>
                <Gap level={1} />
                <Table>
                  <TableItem $header>
                    <TableField $flexSize={0.5}>Icon</TableField>
                    <TableField $flexSize={1.5}>Evaluation Template</TableField>
                    <TableField>Account Size</TableField>
                    <TableField>Profit Target</TableField>
                    <TableField>Consistency Rule</TableField>
                    <TableField $flexSize={0.5}>Manage</TableField>
                  </TableItem>
                  {accountTemplates
                    .filter((acc) => acc.isEval)
                    .map((template, idx) => (
                      <TableItem key={template.name} $idx={idx}>
                        <TableField
                          $flexSize={0.5}
                          $src={template.displayImage}
                        ></TableField>
                        <TableField $flexSize={1.5}>{template.name}</TableField>
                        <TableField>
                          {formatter.format(template.accountSize as number)}
                        </TableField>
                        <TableField>
                          {template?.profitTarget
                            ? formatter.format(template.profitTarget as number)
                            : "N/A"}
                        </TableField>
                        <TableField>
                          {template?.consistency && template.consistency > 0
                            ? `${decimalStringToInt(template.consistency)}%`
                            : "None"}
                        </TableField>
                        <TableField $flexSize={0.5}>
                          <InfoPopout infoDescription="Edit Template">
                            <EditIcon
                              onClick={() => {
                                updateSelectedAccountTemplate(template);
                                updateAddAccountModalOpen(true);
                              }}
                              style={{
                                height: 15,
                                width: 15,
                                cursor: "pointer",
                                pointerEvents: "auto",
                                marginLeft: 5,
                              }}
                            />
                          </InfoPopout>
                          <InfoPopout infoDescription="Delete Template">
                            <DeleteOutlineIcon
                              style={{
                                height: 15,
                                width: 15,
                                cursor: "pointer",
                                pointerEvents: "auto",
                                marginLeft: 5,
                              }}
                              onClick={() => {
                                updateSelectedAccountTemplate(template);
                                setDeleteTemplateModalOpen(true);
                              }}
                            />
                          </InfoPopout>
                        </TableField>
                      </TableItem>
                    ))}
                </Table>
              </SectionContainer>
            </GlassTileChildrenWrapper>
          </GlassTile>
        </AccountTemplatesSection>
        <Gap level={1} />

        <TagsSection>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <SubsectionHeaderWrapper>
                <LocalOfferIcon style={{ color: "white", marginRight: 5 }} />
                Tag Management
                <Button
                  text="Add Tag"
                  onClick={() => {
                    updateSelectedTag(initialState.selectedTag);
                    updateAddTagModalOpen(true);
                    updateAddTagErrors({});
                  }}
                  style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
                />
              </SubsectionHeaderWrapper>
              <SectionContainer>
                <SectionText>
                  Review and manage tags used for journal entiries.
                </SectionText>
                <Table>
                  <TableItem $header>
                    <TableField $flexSize={1.5}>Tag</TableField>
                    <TableField>
                      Uses
                      <InfoPopout infoDescription="Number of Journal Entries that use this tag" />
                    </TableField>
                    <TableField $flexSize={0.5}>Manage</TableField>
                  </TableItem>
                  {tags.map((tag, idx) => (
                    <TableItem key={tag.name} $idx={idx}>
                      <TableField $flexSize={1.5}>{tag.name}</TableField>
                      <TableField>{tag.uses}</TableField>
                      <TableField $flexSize={0.5}>
                        <InfoPopout infoDescription="Edit Tag">
                          <EditIcon
                            style={{
                              height: 15,
                              width: 15,
                              cursor: "pointer",
                              pointerEvents: "auto",
                              marginLeft: 5,
                            }}
                            onClick={() => {
                              updateSelectedTag(tag);
                              updateAddTagModalOpen(true);
                              updateAddTagErrors({});
                            }}
                          />
                        </InfoPopout>
                        <InfoPopout infoDescription="Delete Tag">
                          <DeleteOutlineIcon
                            style={{
                              height: 15,
                              width: 15,
                              cursor: "pointer",
                              pointerEvents: "auto",
                              marginLeft: 5,
                            }}
                            onClick={() => {
                              updateSelectedTag(tag);
                              setDeleteTagModalOpen(true);
                              updateAddTagErrors({});
                            }}
                          />
                        </InfoPopout>
                      </TableField>
                    </TableItem>
                  ))}
                </Table>
              </SectionContainer>
            </GlassTileChildrenWrapper>
          </GlassTile>
        </TagsSection>
        <Gap level={1} />
        <Section>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <SubsectionHeaderWrapper>
                <InventoryIcon style={{ color: "white", marginRight: 5 }} />
                Archived Accounts
              </SubsectionHeaderWrapper>
              <SectionContainer>
                <ListContainer>
                  {archivedTradingAccounts.map((account, index) =>
                    !account.accountType.isEval ? (
                      <FundedAccountsListItem
                        archived
                        key={index}
                        account={account as TradingAccount}
                        openAddTradingDayModal={() => {}}
                      />
                    ) : (
                      <EvaluationAccountsListItem
                        archived
                        key={index}
                        account={account as EvaluationAccount}
                        openAddTradingDayModal={() => {}}
                      />
                    ),
                  )}
                </ListContainer>
                <Pagination
                  color={"primary"}
                  page={archivedTradingAccountsPage}
                  sx={{
                    "& .MuiPaginationItem-root": { color: "white" },
                  }}
                  count={
                    !!archivedTradingAccountsItemCount
                      ? Math.ceil(archivedTradingAccountsItemCount / 10)
                      : 1
                  }
                  onChange={(e, page) => {
                    setArchivedTradingAccountsPage(page);
                    getArchivedTradingAccounts(page);
                  }}
                />
              </SectionContainer>
            </GlassTileChildrenWrapper>
          </GlassTile>
        </Section>
      </Container>
    </Page>
  );
};

export default Preferences;
