import AlertPopout from "@components/Alert/AlertPopout";
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
import type { TradingAccount } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { AccountTradingDaysComplete } from "@pages/EvaluationAccounts/EvaluationAccountsStyledComponents";
import useGetFundedAccountTemplates from "@pages/Settings/hooks/useGetFundedAccountTemplates";
import useGetAccountTemplatesHandler from "@pages/Settings/Preferences/hooks/useGetAccountTemplatesHandler";
import { color } from "@styles/colors";
import { BorderLinearProgress } from "@styles/globalStyledComponents";
import { formatter } from "@utils/utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import AddTradingDayModal from "../AddTradingDayModal/AddTradingDayModal";
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
import useFundedAccountsDispatch from "../hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "../hooks/useFundedAccountsState";
import useGetTradingAccountsHandler from "../hooks/useGetTradingAccountsHandler";
import {
  AccountDetailContainer,
  AccountName,
  AccountNameContainer,
  AccountNameDeleteContainer,
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
  SelectButtonWrapper,
  Time,
  TradeDay,
  TradeJournalPnL,
  TradePreview,
  TradePreviewContainer,
  TradingDaysContainer,
  TradingDaysHeaderContainer,
} from "./FundedAccountDetailStyledComponents";
import styles from "./FundedAccountDetailStyles";
interface FundedAccountDetailProps {}

const FundedAccountDetail: React.FunctionComponent<
  FundedAccountDetailProps
> = () => {
  const { currentTradingAccount, tradingAccounts, createTradingAccountErrors } =
    useFundedAccountsState();
  const { updateCurrentTradingAccount } = useFundedAccountsDispatch();
  let [searchParams] = useSearchParams();
  const accountId = searchParams.get("id");
  const [originalTradingAccountDetails, setOriginalTradingAccountDetails] =
    useState<TradingAccount | null>(null);
  const [editingAccountName, setEditingAccountName] = useState<boolean>(false);
  const [editingAccountType, setEditingAccountType] = useState<boolean>(false);
  const [addTradingDayOpen, setAddTradingDayOpen] = useState<boolean>(false);
  const [payoutRecord, setPayoutRecord] = useState<boolean>(false);
  const navigation = useReactNavigation();
  const accountTemplateList = useGetFundedAccountTemplates();
  const { getTradingAccounts } = useGetTradingAccountsHandler();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();

  useEffect(() => {
    if (tradingAccounts.length === 0) {
      getTradingAccounts();
      return;
    }
    if (accountTemplateList.length === 0) {
      getAccountTemplates();
      return;
    }
  }, []);

  useEffect(() => {
    const selectedAccount = tradingAccounts.find(
      (account) => account.id === Number(accountId),
    );
    if (accountId && selectedAccount) {
      updateCurrentTradingAccount(selectedAccount);
      setOriginalTradingAccountDetails(selectedAccount);
    }
  }, [tradingAccounts, accountId]);

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        hideDuration={4000}
        message={createTradingAccountErrors?.error}
        open={!!createTradingAccountErrors?.error}
        setPopoutOpen={() => {}}
      />
      <AlertPopout
        hideDuration={4000}
        message={createTradingAccountErrors?.detail}
        open={!!createTradingAccountErrors?.detail}
        setPopoutOpen={() => {}}
      />
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
              <AccountImage $image={currentTradingAccount?.image || ""} />
              <AccountDetailContainer>
                <If condition={!editingAccountName}>
                  <AccountNameDeleteContainer>
                    <AccountName>
                      {currentTradingAccount?.name}
                      <EditIcon
                        style={styles.editIcon}
                        onClick={() => setEditingAccountName(true)}
                      />
                    </AccountName>
                    <DeleteOutlineIcon
                      style={{
                        height: 20,
                        display: "flex",
                        alignContent: "center",
                      }}
                      onClick={() => alert("delete account")}
                    />
                  </AccountNameDeleteContainer>
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
                            setEditingAccountName(false);
                          }
                        }}
                        value={currentTradingAccount?.name || ""}
                        onChange={(e) => {
                          updateCurrentTradingAccount({
                            ...currentTradingAccount,
                            name: e.target.value,
                          });
                        }}
                      />
                      <Button
                        style={styles.saveButton}
                        text={"Save"}
                        disabled={
                          !currentTradingAccount?.name ||
                          currentTradingAccount?.name ===
                            originalTradingAccountDetails?.name
                        }
                        disabledBlock={
                          !currentTradingAccount?.name ||
                          currentTradingAccount?.name ===
                            originalTradingAccountDetails?.name
                        }
                        onClick={() => setEditingAccountName(false)}
                      />
                      <Button
                        style={styles.saveButton}
                        text={"Cancel"}
                        onClick={() => setEditingAccountName(false)}
                      />
                    </AccountName>
                  </Else>
                </If>
                <AccountType>
                  {`Account Type: ${editingAccountType ? "" : currentTradingAccount?.accountType?.name}`}
                  <If condition={!editingAccountType}>
                    <EditIcon
                      style={styles.subtitleEditIcon}
                      onClick={() => setEditingAccountType(true)}
                    />
                    <Else>
                      <SelectButtonWrapper>
                        <SelectWrapper
                          onSelect={(selected) => {
                            setEditingAccountType(false);
                          }}
                          style={styles.selectStyle}
                          items={accountTemplateList.map((template) => {
                            return { name: template.name, value: template.id };
                          })}
                        />
                        <Button
                          style={{
                            flex: 1,
                            height: 40,
                          }}
                          text={"Cancel"}
                          onClick={() => setEditingAccountType(false)}
                        />
                      </SelectButtonWrapper>
                    </Else>
                  </If>
                </AccountType>
                <AccountTradingDaysComplete>
                  {`Eligible Days: ${currentTradingAccount?.currentDayCount ?? "N/A"}/${
                    currentTradingAccount?.minTradingDays ?? "N/A"
                  }`}
                  <InfoPopout
                    infoDescription={`This account requires a minimum of ${currentTradingAccount?.minTradingDays} eligible trading days.`}
                  />
                </AccountTradingDaysComplete>
              </AccountDetailContainer>
              <AccountPerformanceContainer>
                <BufferContainer>
                  <BufferText>
                    Min Buffer:
                    <BufferAmountHighlighted
                      $bufferPercent={currentTradingAccount?.bufferPercent}
                    >
                      {formatter.format(
                        currentTradingAccount?.accountBalance -
                          currentTradingAccount?.accountSize,
                      )}
                    </BufferAmountHighlighted>
                    /
                    <BufferAmount>
                      {formatter.format(currentTradingAccount?.minBuffer)}
                    </BufferAmount>
                    <InfoPopout
                      infoDescription={`This account requires a minimum buffer of ${formatter.format(currentTradingAccount?.minBuffer)} before a payout can be requested.`}
                    />
                  </BufferText>
                  <BorderLinearProgress
                    $bufferPercent={currentTradingAccount?.bufferPercent}
                    variant="determinate"
                    value={currentTradingAccount?.bufferPercent}
                    style={styles.progressBar}
                  />
                </BufferContainer>
                <ConsistencyContainer>
                  <ConsistencyScore>
                    {currentTradingAccount?.consistency
                      ? `${currentTradingAccount?.consistency}%`
                      : "None"}
                  </ConsistencyScore>
                  <ConsistencyLabel>{"Consistency"}</ConsistencyLabel>
                </ConsistencyContainer>
                <PnLContainer>
                  <PnLValue
                    $bufferPercent={currentTradingAccount?.bufferPercent}
                  >
                    {formatter.format(
                      currentTradingAccount?.accountBalance -
                        currentTradingAccount?.accountSize,
                    )}
                  </PnLValue>
                  <PnLWithdrawable
                    $positive={
                      currentTradingAccount?.accountBalance -
                        currentTradingAccount?.accountSize -
                        currentTradingAccount?.minBuffer >
                      0
                    }
                  >
                    <PnLWithdrawableText>Withdrawable:</PnLWithdrawableText>
                    {currentTradingAccount?.accountBalance -
                      currentTradingAccount?.accountSize -
                      currentTradingAccount?.minBuffer <
                    0
                      ? formatter.format(0)
                      : formatter.format(
                          currentTradingAccount?.accountBalance -
                            currentTradingAccount?.accountSize -
                            currentTradingAccount?.minBuffer,
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
            {currentTradingAccount?.dayValues
              .reverse()
              .map((dayValue, index) => (
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
                          <>
                            <TradePreview
                              $idx={index}
                              onClick={() =>
                                navigation.navigate(PageEnum.JournalEntry, {
                                  id: index,
                                })
                              }
                            />
                            <TradeJournalPnL $positive={index !== 2}>
                              ${1800}
                            </TradeJournalPnL>
                          </>
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
                      <DayValue>{dayValue.dayNumber}</DayValue>
                    </PreviewDayValueContainer>
                    <DateContainer>
                      {index % 2 === 0 ? "3x Accs" : "-"}
                    </DateContainer>
                    <DateContainer>
                      {moment().add(index, "days").format("MMM D, YYYY")}
                      <Time>{`10:${index}0 AM`}</Time>
                    </DateContainer>
                    <PnL $positive={dayValue.pnl >= 0}>
                      {formatter.format(dayValue.pnl)}
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

export default FundedAccountDetail;
