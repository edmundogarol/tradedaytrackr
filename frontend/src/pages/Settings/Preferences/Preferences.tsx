import AlertPopout from "@components/Alert/AlertPopout";
import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Loading from "@components/Loading/Loading";
import ModalWrapper from "@components/Modal/Modal";
import Page from "@components/Page/Page";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { color } from "@styles/colors";
import { BUTTON_WIDTH } from "@styles/constants";
import {
  PageContainer as Container,
  SectionText,
  SectionTitle,
  Table,
  TableField,
  TableItem,
} from "@styles/globalStyledComponents";
import { formatter } from "@utils/utils";
import React, { useEffect, useState } from "react";
import { initialState } from "../SettingsState";
import useSettingsDispatch from "../hooks/useSettingsDispatch";
import useSettingsState from "../hooks/useSettingsState";
import AddTagModal from "./ AddTagModal/AddTagModal";
import AddAccountTemplateModal from "./AddAccountTemplateModal/AddAccountTemplateModal";
import {
  AccountTemplatesSection,
  SectionContainer,
  SubsectionHeaderWrapper,
  TagsSection,
} from "./PreferencesStyledComponents";
import useDeleteAccountTemplatesHandler from "./hooks/useDeleteAccountTemplatesHandler";
import useGetAccountTemplatesHandler from "./hooks/useGetAccountTemplatesHandler";

interface PreferencesProps {}

const Preferences: React.FunctionComponent<PreferencesProps> = () => {
  const {
    updateSelectedAccountTemplate,
    updateAddAccountModalOpen,
    updateAddTagModalOpen,
    updateAccountTemplatesErrors,
  } = useSettingsDispatch();
  const {
    selectedAccountTemplate,
    accountTemplates,
    tags,
    addAccountTemplateErrors,
  } = useSettingsState();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  const [deleteTemplateModalOpen, setDeleteTemplateModalOpen] = useState(false);
  const { deleteAccountTemplate, loading: deleteLoading } =
    useDeleteAccountTemplatesHandler();

  useEffect(() => {
    getAccountTemplates();
  }, []);

  useEffect(() => {
    if (addAccountTemplateErrors?.detail) {
      setDeleteTemplateModalOpen(false);
    }
  }, [addAccountTemplateErrors]);

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        hideDuration={3000}
        open={addAccountTemplateErrors?.detail}
        message={addAccountTemplateErrors?.detail}
        setPopoutOpen={() => updateAccountTemplatesErrors({})}
      />
      <ModalWrapper
        setOpen={setDeleteTemplateModalOpen}
        open={deleteTemplateModalOpen}
        onClose={() => setDeleteTemplateModalOpen(false)}
        title="Delete Account Template"
      >
        <TableItem key={selectedAccountTemplate.name}>
          <TableField
            $flexSize={0.5}
            $src={selectedAccountTemplate.displayImage}
          ></TableField>
          <TableField $flexSize={1.5}>
            {selectedAccountTemplate.name}
          </TableField>
          <TableField>
            {formatter.format(selectedAccountTemplate?.accountSize as number)}
          </TableField>
          <TableField>
            {selectedAccountTemplate.isEval
              ? "Evaluation Template"
              : "Funded Template"}
          </TableField>
        </TableItem>
        <Gap level={2} />
        <FormError error={addAccountTemplateErrors?.error} />
        <Gap level={2} />
        <SectionText>
          Are you sure you want to delete this account template? This action
          cannot be undone.
        </SectionText>
        <Gap level={2} />
        <Button
          text={deleteLoading ? <Loading size={15} /> : "Delete"}
          style={{ backgroundColor: color("SystemRed"), color: "white" }}
          onClick={() => {
            deleteAccountTemplate(selectedAccountTemplate?.id.toString());
          }}
        />
      </ModalWrapper>
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
                            ? `${template.consistency}%`
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
                  onClick={() => updateAddTagModalOpen(true)}
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
      </Container>
    </Page>
  );
};

export default Preferences;
