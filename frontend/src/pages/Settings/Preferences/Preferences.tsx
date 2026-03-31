import Button from "@components/Button/Button";
import Carousel from "@components/Carousel/Carousel";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Input from "@components/Input/Input";
import ModalWrapper from "@components/Modal/Modal";
import Page from "@components/Page/Page";
import SelectWrapper from "@components/Select/SelectWrapper";
import type { AccountTemplate } from "@interfaces/CustomTypes";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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
import { firmLogoSrc, formatter, imageSrc } from "@utils/utils";
import React, { useEffect } from "react";
import {
  AccountImageSliderContainer,
  AccountTemplatesSection,
  AddTemplateSection,
  AddTemplateSectionHalf,
  SectionContainer,
  SubsectionHeaderWrapper,
  TagsSection,
} from "./PreferencesStyledComponents";

interface PreferencesProps {}

const Preferences: React.FunctionComponent<PreferencesProps> = () => {
  const [tagModalOpen, setTagModalOpen] = React.useState(false);
  const [templateModalOpen, setTemplateModalOpen] = React.useState(false);
  const accountTemplatesMock: AccountTemplate[] = [
    {
      id: 1,
      name: "MyFundedFutures Flex",
      firm: "MyFundedFutures",
      image: imageSrc(firmLogoSrc("myfundedfutures")),
      accountSize: 50000,
      minDaysToPayout: 5,
      minBufferTarget: 250,
      allowablePayoutRequest: 0.5,
      profitSplit: 80,
      minDayProfit: 150,
      maxDrawdown: 2000,
      evalTemplate: false,
      consistency: 0,
    },
    {
      id: 2,
      name: "MyFundedFutures Rapid",
      firm: "MyFundedFutures",
      image: imageSrc(firmLogoSrc("myfundedfutures")),
      accountSize: 50000,
      minDaysToPayout: 1,
      minBufferTarget: 2600,
      allowablePayoutRequest: 1,
      profitSplit: 90,
      minDayProfit: 200,
      maxDrawdown: 2000,
      evalTemplate: false,
      consistency: 0,
    },
    {
      id: 3,
      name: "Apex EOD",
      firm: "Apex",
      image: imageSrc(firmLogoSrc("apex")),
      accountSize: 50000,
      minDaysToPayout: 5,
      minBufferTarget: 2600,
      allowablePayoutRequest: 1,
      profitSplit: 100,
      minDayProfit: 50,
      maxDrawdown: 2000,
      evalTemplate: true,
      profitTarget: 3000,
      consistency: 0,
    },
    {
      id: 4,
      name: "Bulenox EOD",
      firm: "Bulenox",
      image: imageSrc(firmLogoSrc("bulenox")),
      accountSize: 50000,
      minDaysToPayout: 10,
      minBufferTarget: 2600,
      allowablePayoutRequest: 1,
      profitSplit: 90,
      minDayProfit: 100,
      maxDrawdown: 2000,
      evalTemplate: true,
      profitTarget: 3000,
      consistency: 50,
    },
  ];

  const tagsMock = [
    { name: "IFVG", uses: 20 },
    { name: "Discount", uses: 10 },
    { name: "Premium", uses: 15 },
    {
      name: "50% Tap",
      uses: 25,
    },
    {
      name: "BPR",
      uses: 30,
    },
    {
      name: "Vshape",
      uses: 35,
    },
  ];
  const newAccountTemplate: AccountTemplate = {
    id: 0,
    name: undefined,
    firm: undefined,
    image: undefined,
    accountSize: undefined,
    minDaysToPayout: undefined,
    minBufferTarget: undefined,
    allowablePayoutRequest: undefined,
    profitSplit: undefined,
    minDayProfit: undefined,
    maxDrawdown: undefined,
    evalTemplate: false,
    profitTarget: undefined,
    consistency: undefined,
  };
  const [mockAccountTemplate, setMockAccountTemplate] =
    React.useState<AccountTemplate>(newAccountTemplate);

  const [carouselImages, setCarouselImages] = React.useState<string[]>([
    "add",
    "myfundedfutures",
    "apex",
    "bulenox",
    "alpha",
  ]);

  console.log({ image: mockAccountTemplate.image });

  useEffect(() => {
    if (!!mockAccountTemplate.image) {
      setCarouselImages([mockAccountTemplate.image, ...carouselImages]);
    }
  }, [mockAccountTemplate]);
  return (
    <Page topBarShowMenu={true}>
      <ModalWrapper
        open={tagModalOpen}
        title="Add Tag"
        onClose={() => setTagModalOpen(false)}
        setOpen={setTagModalOpen}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Input placeholder="Type tag name" />
          <Button
            text="Add"
            style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
          />
        </div>
      </ModalWrapper>
      <ModalWrapper
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        open={templateModalOpen}
        title="Create New Account Template"
        onClose={() => {
          setMockAccountTemplate(newAccountTemplate);
          setCarouselImages([
            "add",
            "myfundedfutures",
            "apex",
            "bulenox",
            "alpha",
          ]);
          setTemplateModalOpen(false);
        }}
        setOpen={setTemplateModalOpen}
      >
        <SectionText>Add / Choose Account Image</SectionText>
        <AccountImageSliderContainer>
          <Carousel
            items={carouselImages}
            onItemShown={(item) => console.log(item)}
            renderItem={(item) => {
              if (item.includes("/firms")) {
                return (
                  <img
                    style={{ height: 50, width: 50 }}
                    src={mockAccountTemplate.image}
                  />
                );
              }
              return item === "add" ? (
                <AddPhotoAlternateIcon
                  style={{
                    color: color("SystemLabel1"),
                    height: 50,
                    width: 50,
                  }}
                />
              ) : (
                <img
                  style={{ height: 50, width: 50 }}
                  src={imageSrc(firmLogoSrc(item as string))}
                />
              );
            }}
          />
        </AccountImageSliderContainer>
        <AddTemplateSection>
          <AddTemplateSectionHalf>
            <Input
              value={mockAccountTemplate.name}
              onChange={(e) =>
                setMockAccountTemplate({
                  ...mockAccountTemplate,
                  name: e.target.value,
                })
              }
              placeholder="Type Template name"
              label="Account Template Name"
            />
            <Gap level={0} />
            <SelectWrapper
              label="Account Type"
              items={["Funded Account", "Evaluation Account"]}
              onSelect={(val) => {
                setMockAccountTemplate({
                  ...mockAccountTemplate,
                  evalTemplate: val === "Evaluation Account",
                });
              }}
            />
            <Input
              value={mockAccountTemplate.firm}
              onChange={(e) => {
                setMockAccountTemplate({
                  ...mockAccountTemplate,
                  firm: e.target.value,
                });
              }}
              onSuggestionClick={(value) => {
                setMockAccountTemplate({
                  ...mockAccountTemplate,
                  firm: value,
                });
              }}
              placeholder="Prop Firm (e.g. MyFundedFutures)"
              label="Prop Firm"
              suggestions={[
                {
                  description: "MyFundedFutures",
                },
                {
                  description: "Apex",
                },
                {
                  description: "Bulenox",
                },
                {
                  description: "Alpha",
                },
              ]}
            />
            <Input
              positiveOnly
              value={mockAccountTemplate.accountSize}
              onChange={(e) =>
                setMockAccountTemplate({
                  ...mockAccountTemplate,
                  accountSize: Number(e.target.value),
                })
              }
              onSuggestionClick={(value) => {
                setMockAccountTemplate({
                  ...mockAccountTemplate,
                  accountSize: Number(value),
                });
              }}
              type="number"
              placeholder="Account Size (e.g. $50,000)"
              label="Account Size"
              suggestions={[
                {
                  description: "25000",
                },
                {
                  description: "50000",
                },
                {
                  description: "100000",
                },
              ]}
            />
            <If condition={!mockAccountTemplate.evalTemplate}>
              <Input
                positiveOnly
                value={mockAccountTemplate.minBufferTarget}
                onChange={(e) =>
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    minBufferTarget: Number(e.target.value),
                  })
                }
                onSuggestionClick={(value) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    minBufferTarget: Number(value),
                  });
                }}
                type="number"
                placeholder="Buffer Target (e.g. $2,600)"
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Buffer Target
                    <InfoPopout
                      containerStyle={{ textTransform: "none" }}
                      infoDescription="Minimum buffer required to request payout"
                    />
                  </div>
                }
                suggestions={[
                  {
                    description: "2600",
                  },
                  {
                    description: "250",
                  },
                ]}
              />
            </If>
          </AddTemplateSectionHalf>
          <AddTemplateSectionHalf>
            <If condition={!mockAccountTemplate.evalTemplate}>
              <Input
                positiveOnly
                value={mockAccountTemplate.consistency}
                onChange={(e) =>
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    consistency: Number(e.target.value),
                  })
                }
                onSuggestionClick={(value) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    consistency: Number(value),
                  });
                }}
                type="number"
                placeholder="Consistency Rule (e.g. 50% daily consistency -> input 50)"
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Consistency %
                    <InfoPopout
                      containerStyle={{ textTransform: "none" }}
                      infoDescription="Eg. 50%. If no consistency rule - enter 0"
                    />
                  </div>
                }
              />
              <Input
                positiveOnly
                value={mockAccountTemplate.minDaysToPayout}
                onChange={(e) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    minDaysToPayout: Number(e.target.value),
                  });
                }}
                onSuggestionClick={(value) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    minDaysToPayout: Number(value),
                  });
                }}
                type="number"
                placeholder="Min Days to Payout (e.g. 10)"
                label="Min Days to Payout"
              />
              <Input
                positiveOnly
                value={mockAccountTemplate.profitSplit}
                onChange={(e) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    profitSplit: Number(e.target.value),
                  });
                }}
                onSuggestionClick={(value) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    profitSplit: Number(value),
                  });
                }}
                type="number"
                placeholder="Profit Split (e.g. 80% -> input 80)"
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Profit Split %
                    <InfoPopout
                      containerStyle={{ textTransform: "none" }}
                      infoDescription="Percentage of profit allocated to the trader"
                    />
                  </div>
                }
              />
              <Input
                positiveOnly
                value={mockAccountTemplate.minDayProfit}
                onChange={(e) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    minDayProfit: Number(e.target.value),
                  });
                }}
                onSuggestionClick={(value) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    minDayProfit: Number(value),
                  });
                }}
                type="number"
                placeholder="Minimum Daily Profit required (e.g. $150)"
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Minimum Daily Profit
                    <InfoPopout
                      containerStyle={{ textTransform: "none" }}
                      infoDescription="Minimum daily profit required to meet the trading day eligibility requirements"
                    />
                  </div>
                }
              />
            </If>
            <If condition={mockAccountTemplate.evalTemplate}>
              <Input
                value={mockAccountTemplate.profitTarget}
                onChange={(e) =>
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    profitTarget: Number(e.target.value),
                  })
                }
                onSuggestionClick={(value) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    profitTarget: Number(value),
                  });
                }}
                type="number"
                placeholder="Profit Target (e.g. $3,000)"
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Profit Target
                    <InfoPopout
                      containerStyle={{ textTransform: "none" }}
                      infoDescription="Profit target required to complete evaluation and move to funded account"
                    />
                  </div>
                }
                suggestions={[
                  {
                    description: "3000",
                  },
                  {
                    description: "5000",
                  },
                ]}
              />
              <Input
                positiveOnly
                value={mockAccountTemplate.consistency}
                onChange={(e) =>
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    consistency: Number(e.target.value),
                  })
                }
                onSuggestionClick={(value) => {
                  setMockAccountTemplate({
                    ...mockAccountTemplate,
                    consistency: Number(value),
                  });
                }}
                type="number"
                placeholder="Consistency Rule (e.g. 50% daily consistency -> input 50)"
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Consistency %
                    <InfoPopout
                      containerStyle={{ textTransform: "none" }}
                      infoDescription="Eg. 50%. If no consistency rule - enter 0"
                    />
                  </div>
                }
              />
            </If>
            <Input
              positiveOnly
              value={mockAccountTemplate.maxDrawdown}
              onChange={(e) =>
                setMockAccountTemplate({
                  ...mockAccountTemplate,
                  maxDrawdown: Number(e.target.value),
                })
              }
              onSuggestionClick={(value) => {
                setMockAccountTemplate({
                  ...mockAccountTemplate,
                  maxDrawdown: Number(value),
                });
              }}
              type="number"
              placeholder="Max Drawdown (e.g. $2,000)"
              label="Max Drawdown"
              suggestions={[
                {
                  description: "2000",
                },
              ]}
            />
            <Gap level={1} />
            <Button
              text="Create"
              style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
            />
          </AddTemplateSectionHalf>
        </AddTemplateSection>
      </ModalWrapper>
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
                    setTemplateModalOpen(true);
                    setCarouselImages([
                      "add",
                      "myfundedfutures",
                      "apex",
                      "bulenox",
                      "alpha",
                    ]);
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
                  {accountTemplatesMock
                    .filter((acc) => !acc.evalTemplate)
                    .map((template, idx) => (
                      <TableItem key={template.name} $idx={idx}>
                        <TableField $flexSize={0.5}>
                          <img
                            style={{ height: 50, width: 50 }}
                            src={template.image}
                            alt={template.name}
                          />
                        </TableField>
                        <TableField $flexSize={1.5}>{template.name}</TableField>
                        <TableField>
                          {formatter.format(template?.accountSize as number)}
                        </TableField>
                        <TableField>
                          {template.minDaysToPayout}{" "}
                          {`day${(template?.minDaysToPayout as number) > 1 ? "s" : ""}`}
                        </TableField>
                        <TableField>
                          {formatter.format(template.minBufferTarget as number)}
                        </TableField>
                        <TableField $flexSize={0.5}>
                          <InfoPopout infoDescription="Edit Template">
                            <EditIcon
                              onClick={() => {
                                setMockAccountTemplate(template);
                                setCarouselImages([
                                  "add",
                                  "myfundedfutures",
                                  "apex",
                                  "bulenox",
                                  "alpha",
                                ]);
                                setTemplateModalOpen(true);
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
                  {accountTemplatesMock
                    .filter((acc) => acc.evalTemplate)
                    .map((template, idx) => (
                      <TableItem key={template.name} $idx={idx}>
                        <TableField $flexSize={0.5}>
                          <img
                            style={{ height: 50, width: 50 }}
                            src={template.image}
                            alt={template.name}
                          />
                        </TableField>
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
                          {template?.consistency
                            ? `${template.consistency}%`
                            : "None"}
                        </TableField>
                        <TableField $flexSize={0.5}>
                          <InfoPopout infoDescription="Edit Template">
                            <EditIcon
                              onClick={() => {
                                setMockAccountTemplate(template);
                                setCarouselImages([
                                  "add",
                                  "myfundedfutures",
                                  "apex",
                                  "bulenox",
                                  "alpha",
                                ]);
                                setTemplateModalOpen(true);
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
                  onClick={() => setTagModalOpen(true)}
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
                  {tagsMock.map((tag, idx) => (
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
