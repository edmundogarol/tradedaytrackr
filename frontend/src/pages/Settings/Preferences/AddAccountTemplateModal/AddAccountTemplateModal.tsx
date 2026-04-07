import Button from "@components/Button/Button";
import Carousel from "@components/Carousel/Carousel";
import Gap from "@components/Gap/Gap";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Input from "@components/Input/Input";
import Loading from "@components/Loading/Loading";
import ModalWrapper from "@components/Modal/Modal";
import SelectWrapper from "@components/Select/SelectWrapper";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { color } from "@styles/colors";
import { BUTTON_WIDTH } from "@styles/constants";
import { SectionText } from "@styles/globalStyledComponents";
import { firmLogoSrc, imageSrc } from "@utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { initialState } from "../../SettingsState";
import useSettingsDispatch from "../../hooks/useSettingsDispatch";
import useSettingsState from "../../hooks/useSettingsState";
import {
  AccountImageSliderContainer,
  AddImageContainer,
  AddTemplateSection,
  AddTemplateSectionHalf,
  ImagePreviewContainer,
} from "../PreferencesStyledComponents";
import useCreateAccountTemplateHandler from "./hooks/useCreateAccountTemplateHandler";
import useUpdateAccountTemplateHandler from "./hooks/useUpdateAccountTemplateHandler";

interface AddAccountTemplateModalProps {}

const AddAccountTemplateModal: React.FunctionComponent<
  AddAccountTemplateModalProps
> = () => {
  const {
    updateSelectedAccountTemplate,
    updateAddAccountModalOpen,
    updateAccountTemplatesErrors,
  } = useSettingsDispatch();
  const {
    selectedAccountTemplate,
    addAccountTemplateModalOpen,
    addAccountTemplateErrors,
  } = useSettingsState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [accountTemplateImage, setAccountTemplateImage] = useState<File | null>(
    null,
  );
  const [selectedCarouselImage, setSelectedCarouselImage] = useState<
    string | null
  >(null);
  const { createAccountTemplate, loading } = useCreateAccountTemplateHandler();
  const { updateAccountTemplate, loading: updateLoading } =
    useUpdateAccountTemplateHandler();
  const [carouselImages, setCarouselImages] = React.useState<string[]>([
    "add",
    "myfundedfutures",
    "apex",
    "topstep",
    "ftmo",
    "bulenox",
    "alpha",
  ]);
  const editingExistingTemplate = !!selectedAccountTemplate.id;

  useEffect(() => {
    setAccountTemplateImage(null);
  }, [addAccountTemplateModalOpen]);

  return (
    <ModalWrapper
      contentContainerStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      open={addAccountTemplateModalOpen}
      title={
        editingExistingTemplate
          ? "Edit Account Template"
          : "Create New Account Template"
      }
      onClose={() => {
        updateSelectedAccountTemplate(initialState.selectedAccountTemplate);
        setCarouselImages([
          "add",
          "myfundedfutures",
          "apex",
          "topstep",
          "ftmo",
          "bulenox",
          "alpha",
        ]);
        updateAddAccountModalOpen(false);
        updateAccountTemplatesErrors({});
      }}
      setOpen={updateAddAccountModalOpen}
    >
      <SectionText>Add / Choose Account Image</SectionText>
      <AccountImageSliderContainer>
        <Carousel
          selectedCarouselImage={selectedAccountTemplate.displayImage}
          onItemShown={(item) => setSelectedCarouselImage(item)}
          items={carouselImages}
          renderItem={(item) => {
            return item === "add" ? (
              <AddImageContainer>
                <If condition={!!accountTemplateImage}>
                  <ImagePreviewContainer
                    $src={
                      accountTemplateImage instanceof File
                        ? URL.createObjectURL(accountTemplateImage)
                        : ""
                    }
                    onClick={() => fileInputRef?.current?.click()}
                  />
                  <Else>
                    <If
                      condition={
                        !!selectedAccountTemplate.displayImage &&
                        !selectedAccountTemplate.icon
                      }
                    >
                      <ImagePreviewContainer
                        $src={selectedAccountTemplate.displayImage || ""}
                        onClick={() => fileInputRef?.current?.click()}
                      />
                      <Else>
                        <AddPhotoAlternateIcon
                          style={{
                            color: color("SystemLabel1"),
                            height: 50,
                            width: 50,
                          }}
                          onClick={() => fileInputRef?.current?.click()}
                        />
                      </Else>
                    </If>
                  </Else>
                </If>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (selected) {
                      setAccountTemplateImage(selected);
                    }
                  }}
                />
              </AddImageContainer>
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
            error={addAccountTemplateErrors?.name}
            value={selectedAccountTemplate.name}
            onChange={(e) =>
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
                name: e.target.value,
              })
            }
            placeholder="Type Template name"
            label="Account Template Name"
          />
          <Gap level={0} />
          <SelectWrapper
            label="Account Type"
            defaultValue={
              selectedAccountTemplate.isEval
                ? "Evaluation Account"
                : "Funded Account"
            }
            items={["Funded Account", "Evaluation Account"]}
            onSelect={(val) => {
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
                isEval: val === "Evaluation Account",
              });
              updateAccountTemplatesErrors({});
            }}
          />
          <Input
            error={addAccountTemplateErrors?.firm}
            value={selectedAccountTemplate.firm}
            onChange={(e) => {
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
                firm: e.target.value,
              });
            }}
            onSuggestionClick={(value) => {
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
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
            error={addAccountTemplateErrors?.account_size}
            value={selectedAccountTemplate.accountSize}
            onChange={(e) =>
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
                accountSize: Number(e.target.value),
              })
            }
            onSuggestionClick={(value) => {
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
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
          <If condition={!selectedAccountTemplate.isEval}>
            <Input
              positiveOnly
              error={addAccountTemplateErrors?.min_buffer}
              value={selectedAccountTemplate.minBuffer}
              onChange={(e) =>
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minBuffer: Number(e.target.value),
                })
              }
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minBuffer: Number(value),
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
            <Input
              positiveOnly
              error={addAccountTemplateErrors?.consistency}
              value={selectedAccountTemplate.consistency}
              onChange={(e) =>
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  consistency: Number(e.target.value),
                })
              }
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
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
        </AddTemplateSectionHalf>
        <AddTemplateSectionHalf>
          <If condition={!selectedAccountTemplate.isEval}>
            <Input
              positiveOnly
              error={addAccountTemplateErrors?.allowable_payout_request}
              value={selectedAccountTemplate.allowablePayoutRequest}
              onChange={(e) =>
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  allowablePayoutRequest: Number(e.target.value),
                })
              }
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  allowablePayoutRequest: Number(value),
                });
              }}
              type="number"
              placeholder="Allowable Minimum Payout Request (e.g. $500)"
              label={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Allowable Minimum Payout Request
                  <InfoPopout
                    containerStyle={{ textTransform: "none" }}
                    infoDescription="Minimum payout request allowed"
                  />
                </div>
              }
            />
            <Input
              positiveOnly
              error={addAccountTemplateErrors?.min_trading_days}
              value={selectedAccountTemplate.minTradingDays}
              onChange={(e) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minTradingDays: Number(e.target.value),
                });
              }}
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minTradingDays: Number(value),
                });
              }}
              type="number"
              placeholder={"Min Days to Payout (e.g. 10)"}
              label={"Min Days to Payout"}
            />
            <Input
              positiveOnly
              error={addAccountTemplateErrors?.profit_split}
              value={selectedAccountTemplate.profitSplit}
              onChange={(e) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  profitSplit: Number(e.target.value),
                });
              }}
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
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
              error={addAccountTemplateErrors?.min_day_pnl}
              value={selectedAccountTemplate.minDayPnl}
              onChange={(e) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minDayPnl: Number(e.target.value),
                });
              }}
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minDayPnl: Number(value),
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
          <If condition={selectedAccountTemplate.isEval}>
            <Input
              value={selectedAccountTemplate.profitTarget}
              error={addAccountTemplateErrors?.profit_target}
              onChange={(e) =>
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  profitTarget: Number(e.target.value),
                })
              }
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
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
              error={addAccountTemplateErrors?.consistency}
              value={selectedAccountTemplate.consistency}
              onChange={(e) =>
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  consistency: Number(e.target.value),
                })
              }
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
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
              value={selectedAccountTemplate.minTradingDays}
              error={addAccountTemplateErrors?.min_trading_days}
              onChange={(e) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minTradingDays: Number(e.target.value),
                });
              }}
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minTradingDays: Number(value),
                });
              }}
              type="number"
              placeholder={"Min Trading Days (e.g. 5)"}
              label={"Min Trading Days"}
            />
          </If>
          <Input
            positiveOnly
            error={addAccountTemplateErrors?.max_drawdown}
            value={selectedAccountTemplate.maxDrawdown}
            onChange={(e) =>
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
                maxDrawdown: Number(e.target.value),
              })
            }
            onSuggestionClick={(value) => {
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
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
            text={
              loading || updateLoading ? (
                <Loading size={15} />
              ) : editingExistingTemplate ? (
                "Save"
              ) : (
                "Create"
              )
            }
            style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
            onClick={() => {
              if (editingExistingTemplate) {
                updateAccountTemplate(
                  selectedAccountTemplate,
                  accountTemplateImage || selectedCarouselImage,
                );
                return;
              }
              createAccountTemplate(
                selectedAccountTemplate,
                accountTemplateImage || selectedCarouselImage,
              );
            }}
          />
        </AddTemplateSectionHalf>
      </AddTemplateSection>
    </ModalWrapper>
  );
};

export default AddAccountTemplateModal;
