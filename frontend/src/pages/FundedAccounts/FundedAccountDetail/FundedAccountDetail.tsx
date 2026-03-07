import React from "react";
import Page from "@components/Page/Page";
import { useSearchParams } from "react-router";
import GlassTile from "@components/GlassTile/GlassTile";
import { firmLogoSrc, imageSrc } from "@utils/utils";
import EditIcon from "@mui/icons-material/Edit";
import { AccountTradingDaysComplete } from "@pages/EvaluationAccounts/EvaluationAccountsStyledComponents";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import Input from "@components/Input/Input";
import { Else, If } from "@components/If/If";
import Button from "@components/Button/Button";
import SelectWrapper from "@components/Select/SelectWrapper";
import Gap from "@components/Gap/Gap";
import moment from "moment";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { color } from "@styles/colors";
import {
  AccountImage,
  BufferAmount,
  BufferAmountHighlighted,
  BufferContainer,
  BufferText,
  Container,
  PnLContainer,
  PnLValue,
  PnLWithdrawable,
  PnLWithdrawableText,
  Title,
} from "../FundedAccountsStyledComponents";
import useGetFundedAccountsList from "../hooks/useGetFundedAccountsList";
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
} from "./FundedAccountDetailStyledComponents";
import styles from "./FundedAccountDetailStyles";
import { BorderLinearProgress } from "../FundedAccountsListItem";
import AddTradingDayModal from "../AddTradingDayModal/AddTradingDayModal";
interface FundedAccountDetailProps {}

const FundedAccountDetail: React.FunctionComponent<
  FundedAccountDetailProps
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
  const [payoutRecord, setPayoutRecord] = React.useState<boolean>(false);
  const {
    id,
    accountName,
    accountSize,
    accountBalance,
    accountType: { name: accountTypeName },
    firm,
    firmMinDays,
    firmMinDayPnL,
    currentDayCount,
    dayValues,
    noGlow,
    noShine,
    minBuffer,
    bufferPercent,
  } = useGetFundedAccountsList()[0];
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

  return (
    <Page topBarShowMenu={true}>
      <AddTradingDayModal
        modalOpen={addTradingDayOpen}
        setModalOpen={setAddTradingDayOpen}
        payoutRecord={payoutRecord}
      />
      <Container>
        <ListHeaders>
          <Title>Funded Account Details</Title>
          <BufferHeader>Min Buffer</BufferHeader>
          <BufferHeader>Consistency</BufferHeader>
          <PnLHeader>PnL</PnLHeader>
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
                        items={accountTemplateList}
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
                    Min Buffer:
                    <BufferAmountHighlighted $bufferPercent={bufferPercent}>
                      {formatter.format(accountBalance - accountSize)}
                    </BufferAmountHighlighted>
                    /<BufferAmount>{formatter.format(minBuffer)}</BufferAmount>
                    <InfoPopout
                      infoDescription={`This account requires a minimum buffer of $${minBuffer} before a payout can be requested.`}
                    />
                  </BufferText>
                  <BorderLinearProgress
                    $bufferPercent={bufferPercent}
                    variant="determinate"
                    value={bufferPercent}
                    style={styles.progressBar}
                  />
                </BufferContainer>
                <ConsistencyContainer>
                  <ConsistencyScore>{"50%"}</ConsistencyScore>
                  <ConsistencyLabel>{"Consistency"}</ConsistencyLabel>
                </ConsistencyContainer>
                <PnLContainer>
                  <PnLValue $bufferPercent={bufferPercent}>
                    {formatter.format(accountBalance - accountSize)}
                  </PnLValue>
                  <PnLWithdrawable
                    $positive={accountBalance - accountSize - minBuffer > 0}
                  >
                    <PnLWithdrawableText>Withdrawable:</PnLWithdrawableText>
                    {accountBalance - accountSize - minBuffer < 0
                      ? formatter.format(0)
                      : formatter.format(
                          accountBalance - accountSize - minBuffer,
                        )}
                  </PnLWithdrawable>
                </PnLContainer>
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
            text={"Record Payout"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"money"}
            textStyle={styles.addButton.text}
            style={styles.payoutButton.button}
            onClick={(): void => {
              setAddTradingDayOpen(true);
              setPayoutRecord(true);
            }}
          />
          <Button
            text={"Add Trade"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
            onClick={(): void => {
              setAddTradingDayOpen(true);
              setPayoutRecord(false);
            }}
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
                        <TradePreview $idx={index} />
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
                  <PnL>{formatter.format(dayValue.value)}</PnL>

                  <InfoPopout infoDescription="Edit Details">
                    <EditContainer>
                      <EditIcon
                        style={styles.editIcon}
                        onClick={() => setAddTradingDayOpen(true)}
                      />
                    </EditContainer>
                  </InfoPopout>
                </TradeDay>
              </GlassTile>
            ))}
          </TradingDaysContainer>
        </GlassTile>
      </Container>
    </Page>
  );
};

export default FundedAccountDetail;
