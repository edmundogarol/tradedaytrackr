import Button from "@components/Button/Button";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Input from "@components/Input/Input";
import Page from "@components/Page/Page";
import SelectWrapper from "@components/Select/SelectWrapper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import {
  AccountTradingDaysComplete,
  Status,
  StatusContainer,
} from "@pages/EvaluationAccounts/EvaluationAccountsStyledComponents";
import { color } from "@styles/colors";
import { firmLogoSrc, imageSrc } from "@utils/utils";
import moment from "moment";
import React from "react";
import { useSearchParams } from "react-router";

import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { BorderLinearProgress } from "@styles/globalStyledComponents";
import AddTradingDayModal from "../AddEvaluationTradingDayModal/AddTradingDayModal";
import {
  AccountImage,
  BufferAmount,
  BufferAmountHighlighted,
  BufferContainer,
  BufferText,
  Container,
  Title,
} from "../EvaluationAccountsStyledComponents";
import useGetEvalProgressStatus from "../hooks/useGetEvalProgressStatus";
import useGetEvaluationAccountsList from "../hooks/useGetEvaluationAccountsList";
import {
  AccountDetailContainer,
  AccountName,
  AccountNameContainer,
  AccountPerformanceContainer,
  AccountType,
  BufferHeader,
  ConsistencyContainer,
  ConsistencyLabel,
  ConsistencyScore,
  DateContainer,
  DayValue,
  EditContainer,
  EditDeleteContainer,
  HeaderContainer,
  ListHeaders,
  PnL,
  PnLHeader,
  PreviewDayValueContainer,
  Time,
  TradeDay,
  TradePreview,
  TradePreviewContainer,
  TradingDaysContainer,
  TradingDaysHeaderContainer,
} from "./EvaluationAccountDetailStyledComponents";
import styles from "./EvaluationAccountDetailStyles";
interface EvaluationAccountDetailProps {}

const EvaluationAccountDetail: React.FunctionComponent<
  EvaluationAccountDetailProps
> = () => {
  const [accountNameTemp, setAccountNameTemp] = React.useState<string>(
    "MFFUSFCR72334300-232323231",
  );
  const [editingAccountName, setEditingAccountName] =
    React.useState<boolean>(false);
  const [editingAccountType, setEditingAccountType] =
    React.useState<boolean>(false);
  let [searchParams] = useSearchParams();
  const [addTradingDayOpen, setAddTradingDayOpen] =
    React.useState<boolean>(false);
  const navigation = useReactNavigation();
  const {
    id,
    accountName,
    accountSize,
    accountBalance,
    accountType: { name: accountTypeName },
    firm,
    profitTarget,
    firmMinDays,
    firmMinDayPnL,
    currentDayCount,
    dayValues,
    noGlow,
    noShine,
    minBuffer,
  } = useGetEvaluationAccountsList()[0];
  const accountTemplateList = [
    "MFFU 50k Flex",
    "MFFU 50k Rapid",
    "Apex 50k",
    "Bulenox 50k",
    "Alpha Futures Zero 50k",
  ];
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const evalProgressStatus = useGetEvalProgressStatus();
  const progress = ((accountBalance - accountSize) / profitTarget) * 100;

  return (
    <Page topBarShowMenu={true}>
      <AddTradingDayModal
        modalOpen={addTradingDayOpen}
        setModalOpen={setAddTradingDayOpen}
      />
      <Container>
        <ListHeaders>
          <Title>Evaluation Account Details</Title>
          <BufferHeader>Profit Target</BufferHeader>
          <BufferHeader>Consistency</BufferHeader>
          <PnLHeader>Status</PnLHeader>
        </ListHeaders>
        <GlassTile featureTile minHeight={70} noGlow={true} noShine={false}>
          <HeaderContainer>
            <AccountNameContainer>
              <AccountImage src={imageSrc(firmLogoSrc(firm))} />
              <AccountDetailContainer>
                <If condition={!editingAccountName}>
                  <AccountName>
                    {accountNameTemp}
                    <EditIcon
                      style={styles.editIcon}
                      onClick={() => setEditingAccountName(true)}
                    />
                  </AccountName>
                  <Else>
                    <AccountName>
                      <Input
                        autoFocus
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        style={styles.inputStyle}
                        onKeyDown={(ev) => {
                          if (ev.key === "Enter") {
                            setEditingAccountName(false);
                          }
                          if (ev.key === "Escape") {
                            setAccountNameTemp(accountName);
                            setEditingAccountName(false);
                          }
                        }}
                        value={accountNameTemp}
                        onChange={(e) => setAccountNameTemp(e.target.value)}
                      />
                      <Button
                        style={styles.saveButton}
                        text={"Save"}
                        onClick={() => setEditingAccountName(false)}
                      />
                    </AccountName>
                  </Else>
                </If>
                <AccountType>
                  {`Account Type: ${editingAccountType ? "" : accountTypeName}`}
                  <If condition={!editingAccountType}>
                    <EditIcon
                      style={styles.subtitleEditIcon}
                      onClick={() => setEditingAccountType(true)}
                    />
                    <Else>
                      <SelectWrapper
                        onSelect={(selected) => {
                          console.log(selected);
                          setEditingAccountType(false);
                        }}
                        style={styles.selectStyle}
                        items={accountTemplateList.map((template) => {
                          return { name: template, value: template };
                        })}
                      />
                    </Else>
                  </If>
                </AccountType>
                <AccountTradingDaysComplete>
                  {`Eligible Days: ${currentDayCount ?? "N/A"}/${
                    firmMinDays ?? "N/A"
                  }`}
                  <InfoPopout
                    infoDescription={`This account requires a minimum of ${firmMinDays} eligible trading days.`}
                  />
                </AccountTradingDaysComplete>
              </AccountDetailContainer>
              <AccountPerformanceContainer>
                <BufferContainer>
                  <BufferText>
                    Profit Target:
                    <BufferAmountHighlighted $bufferPercent={70}>
                      {formatter.format(accountBalance - accountSize)}
                    </BufferAmountHighlighted>
                    /<BufferAmount>{formatter.format(minBuffer)}</BufferAmount>
                  </BufferText>
                  <BorderLinearProgress
                    $bufferPercent={70}
                    variant="determinate"
                    value={70}
                    style={styles.progressBar}
                  />
                </BufferContainer>
                <ConsistencyContainer>
                  <ConsistencyScore>{"50%"}</ConsistencyScore>
                  <ConsistencyLabel>{"Consistency"}</ConsistencyLabel>
                </ConsistencyContainer>
                <StatusContainer>
                  <Status $bufferPercent={progress}>
                    {evalProgressStatus(
                      ((accountBalance - accountSize) / profitTarget) * 100,
                    )}
                  </Status>
                </StatusContainer>
              </AccountPerformanceContainer>
            </AccountNameContainer>
          </HeaderContainer>
        </GlassTile>
      </Container>
      <Gap level={2} />

      <Container>
        <TradingDaysHeaderContainer>
          <Title>Trades</Title>
          <Button
            text={"Add Trade"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
            onClick={(): void => setAddTradingDayOpen(true)}
          />
        </TradingDaysHeaderContainer>
        <GlassTile featureTile minHeight={70} noGlow={true} noShine={false}>
          <TradingDaysContainer>
            {dayValues.reverse().map((dayValue, index) => (
              <GlassTile
                key={index}
                featureTile
                minHeight={10}
                minWidth={10}
                padding={7}
                noGlow={true}
              >
                <TradeDay>
                  <PreviewDayValueContainer>
                    <TradePreviewContainer>
                      {index % 2 === 0 ? (
                        <TradePreview
                          $idx={index}
                          onClick={() =>
                            navigation.navigate(PageEnum.JournalEntry, {
                              id: index,
                            })
                          }
                        />
                      ) : (
                        <InfoPopout
                          infoDescription={`Link or convert to journal entry`}
                        >
                          <div>
                            <Icon
                              type={IconTypeEnum.FontAwesome5}
                              name="link"
                              size={30}
                              color={color("SystemLabel1")}
                              style={{ transform: "rotate(135deg)" }}
                            />
                            <WifiProtectedSetupIcon
                              style={{
                                height: 30,
                                width: 30,
                                color: color("SystemLabel1"),
                              }}
                            />
                          </div>
                        </InfoPopout>
                      )}
                    </TradePreviewContainer>
                    <DayValue>{dayValue.day}</DayValue>
                  </PreviewDayValueContainer>
                  <DateContainer>
                    {index % 2 === 0 ? "3x Accs" : "-"}
                  </DateContainer>
                  <DateContainer>
                    {moment().add(index, "days").format("MMM D, YYYY")}
                    <Time>{`10:${index}0 AM`}</Time>
                  </DateContainer>
                  <PnL $positive={dayValue.value >= 0}>
                    {formatter.format(dayValue.value)}
                  </PnL>
                  <EditDeleteContainer>
                    <InfoPopout infoDescription="Edit Details">
                      <EditContainer>
                        <EditIcon
                          style={styles.editIcon}
                          onClick={() => setAddTradingDayOpen(true)}
                        />
                      </EditContainer>
                    </InfoPopout>
                    <InfoPopout infoDescription="Delete Trade">
                      <EditContainer>
                        <DeleteOutlineIcon
                          style={styles.editIcon}
                          onClick={() => alert("Delete Trade")}
                        />
                      </EditContainer>
                    </InfoPopout>
                  </EditDeleteContainer>
                </TradeDay>
              </GlassTile>
            ))}
          </TradingDaysContainer>
        </GlassTile>
      </Container>
    </Page>
  );
};

export default EvaluationAccountDetail;
