import Button from "@components/Button/Button";
import Carousel from "@components/Carousel/Carousel";
import Gap from "@components/Gap/Gap";
import { If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Input from "@components/Input/Input";
import ModalWrapper from "@components/Modal/Modal";
import SelectWrapper from "@components/Select/SelectWrapper";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { color } from "@styles/colors";
import { BUTTON_WIDTH } from "@styles/constants";
import { SectionText } from "@styles/globalStyledComponents";
import { firmLogoSrc, imageSrc } from "@utils/utils";
import React, { useEffect } from "react";
import { initialState } from "../../SettingsState";
import useSettingsDispatch from "../../hooks/useSettingsDispatch";
import useSettingsState from "../../hooks/useSettingsState";
import {
  AccountImageSliderContainer,
  AddTemplateSection,
  AddTemplateSectionHalf,
} from "../PreferencesStyledComponents";

interface AddAccountTemplateModalProps {}

const AddAccountTemplateModal: React.FunctionComponent<
  AddAccountTemplateModalProps
> = () => {
  const { updateSelectedAccountTemplate, updateAddAccountModalOpen } =
    useSettingsDispatch();
  const { selectedAccountTemplate, addAccountModalOpen } = useSettingsState();

  const [carouselImages, setCarouselImages] = React.useState<string[]>([
    "add",
    "myfundedfutures",
    "apex",
    "bulenox",
    "alpha",
  ]);

  useEffect(() => {
    if (!!selectedAccountTemplate?.image) {
      setCarouselImages([selectedAccountTemplate.image, ...carouselImages]);
    }
  }, [selectedAccountTemplate]);
  return (
    <ModalWrapper
      contentContainerStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      open={addAccountModalOpen}
      title="Create New Account Template"
      onClose={() => {
        updateSelectedAccountTemplate(initialState.selectedAccountTemplate);
        setCarouselImages([
          "add",
          "myfundedfutures",
          "apex",
          "bulenox",
          "alpha",
        ]);
        updateAddAccountModalOpen(false);
      }}
      setOpen={updateAddAccountModalOpen}
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
                  src={selectedAccountTemplate.image}
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
            items={["Funded Account", "Evaluation Account"]}
            onSelect={(val) => {
              updateSelectedAccountTemplate({
                ...selectedAccountTemplate,
                evalTemplate: val === "Evaluation Account",
              });
            }}
          />
          <Input
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
          <If condition={!selectedAccountTemplate.evalTemplate}>
            <Input
              positiveOnly
              value={selectedAccountTemplate.minBufferTarget}
              onChange={(e) =>
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minBufferTarget: Number(e.target.value),
                })
              }
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
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
          <If condition={!selectedAccountTemplate.evalTemplate}>
            <Input
              positiveOnly
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
              value={selectedAccountTemplate.minDaysToPayout}
              onChange={(e) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minDaysToPayout: Number(e.target.value),
                });
              }}
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minDaysToPayout: Number(value),
                });
              }}
              type="number"
              placeholder="Min Days to Payout (e.g. 10)"
              label="Min Days to Payout"
            />
            <Input
              positiveOnly
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
              value={selectedAccountTemplate.minDayProfit}
              onChange={(e) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
                  minDayProfit: Number(e.target.value),
                });
              }}
              onSuggestionClick={(value) => {
                updateSelectedAccountTemplate({
                  ...selectedAccountTemplate,
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
          <If condition={selectedAccountTemplate.evalTemplate}>
            <Input
              value={selectedAccountTemplate.profitTarget}
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
          <Input
            positiveOnly
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
            text="Create"
            style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
          />
        </AddTemplateSectionHalf>
      </AddTemplateSection>
    </ModalWrapper>
  );
};

export default AddAccountTemplateModal;
