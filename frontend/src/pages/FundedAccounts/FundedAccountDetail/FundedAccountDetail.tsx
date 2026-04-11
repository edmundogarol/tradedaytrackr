import AlertPopout from "@components/Alert/AlertPopout";
import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Input from "@components/Input/Input";
import ModalWrapper from "@components/Modal/Modal";
import Page from "@components/Page/Page";
import SelectWrapper from "@components/Select/SelectWrapper";
import type { Trade, TradingAccount } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { AccountTradingDaysComplete } from "@pages/EvaluationAccounts/EvaluationAccountsStyledComponents";
import useGetFundedAccountTemplates from "@pages/Settings/hooks/useGetFundedAccountTemplates";
import useGetAccountTemplatesHandler from "@pages/Settings/Preferences/hooks/useGetAccountTemplatesHandler";
import { color } from "@styles/colors";
import {
  BorderLinearProgress,
  HorizontalSection,
  SectionText,
} from "@styles/globalStyledComponents";
import { decimalStringToInt, formatter } from "@utils/utils";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import AddTradingDayModal from "../AddTradingDayModal/AddTradingDayModal";
import { initialState } from "../FundedAccountsState";
import {
  AccountImage,
  AccountSubtitle,
  AccountSubtitleHighlighted,
  AccountTitle,
  AccountTitleContainer,
  BufferAmount,
  BufferAmountHighlighted,
  BufferContainer,
  BufferText,
  Container,
  DaysContainer,
  DaysItem,
  DaysItemSubtitle,
  DaysItemValue,
  ListItemContainer,
  PnLContainer,
  PnLValue,
  PnLWithdrawable,
  PnLWithdrawableText,
  Title,
} from "../FundedAccountsStyledComponents";
import useDeleteTradingAccountHandler from "../hooks/useDeleteTradingAccountHandler";
import useFundedAccountsDispatch from "../hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "../hooks/useFundedAccountsState";
import useGetTradingAccountDetailHandler from "../hooks/useGetTradingAccountDetailHandler";
import useUpdateTradingAccountHandler from "../hooks/useUpdateTradingAccountHandler";
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
  const {
    currentTradingAccount,
    tradingAccounts,
    currentTradingAccountErrors,
    editingAccountBalance,
    editingAccountName,
    editingAccountTemplate,
    deletingTradingAccountModalOpen,
    deleteTradingAccountErrors,
    addTradeErrors,
  } = useFundedAccountsState();
  const {
    updateCurrentTradingAccount,
    updateCurrentTradingAccountErrors,
    updateEditingFields,
    updateDeletingTradingAccountModalOpen,
    updateDeleteTradingAccountErrors,
    updateAddTradeErrors,
    updateAddTradeModalOpen,
    updateSelectedTrade,
  } = useFundedAccountsDispatch();
  let [searchParams] = useSearchParams();
  const accountId = searchParams.get("id");
  const [originalTradingAccountDetails, setOriginalTradingAccountDetails] =
    useState<TradingAccount | null>(null);
  const [payoutRecord, setPayoutRecord] = useState<boolean>(false);
  const navigation = useReactNavigation();
  const accountTemplateList = useGetFundedAccountTemplates();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  const { updateTradingAccount } = useUpdateTradingAccountHandler();
  const { deleteTradingAccount } = useDeleteTradingAccountHandler();
  const { getTradingAccount } = useGetTradingAccountDetailHandler();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    if (accountId && currentTradingAccount.id !== Number(accountId)) {
      getTradingAccount(accountId);
    }
    if (accountTemplateList.length === 0) {
      getAccountTemplates();
    }

    hasFetched.current = true;
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
        open={!!addTradeErrors?.detail}
        hideDuration={3000}
        message={addTradeErrors?.detail}
        setPopoutOpen={() => updateAddTradeErrors({})}
      />
      <AlertPopout
        hideDuration={4000}
        message={currentTradingAccountErrors?.error}
        open={!!currentTradingAccountErrors?.error}
        setPopoutOpen={() => {}}
      />
      <AlertPopout
        hideDuration={2000}
        message={currentTradingAccountErrors?.detail}
        open={!!currentTradingAccountErrors?.detail}
        setPopoutOpen={() => updateCurrentTradingAccountErrors({})}
      />
      <AddTradingDayModal payoutRecord={payoutRecord} />
      <ModalWrapper
        onClose={() => updateDeleteTradingAccountErrors({})}
        open={deletingTradingAccountModalOpen}
        setOpen={updateDeletingTradingAccountModalOpen}
        title="Delete Trading Account"
      >
        <SectionText>
          Are you sure you want to delete this trading account? All associated
          data will be permanently removed.
        </SectionText>
        <Gap level={2} />
        <ListItemContainer>
          <AccountImage $image={currentTradingAccount.image || ""} />
          <AccountTitleContainer>
            <AccountTitle>{currentTradingAccount.name}</AccountTitle>
            <AccountSubtitle>
              Balance:
              <AccountSubtitleHighlighted>
                {formatter.format(currentTradingAccount.accountBalance)}
              </AccountSubtitleHighlighted>
            </AccountSubtitle>
            <AccountTradingDaysComplete>
              {`Eligible Days: ${currentTradingAccount?.currentDayCount ?? "N/A"}/${
                currentTradingAccount?.minTradingDays ?? "N/A"
              }`}
              <InfoPopout
                infoDescription={`This account requires a minimum of ${currentTradingAccount?.minTradingDays} eligible trading days before payout.`}
              />
            </AccountTradingDaysComplete>
          </AccountTitleContainer>
          <DaysContainer>
            {[...currentTradingAccount.dayValues]
              .reverse()
              .map((dayValue, idx) => (
                <DaysItem key={idx}>
                  <GlassTile
                    positive={dayValue.pnl > 0}
                    featureTile
                    minHeight={10}
                    minWidth={10}
                    padding={7}
                  >
                    <DaysItemValue $positive={dayValue.pnl > 0}>
                      {`${dayValue.pnl > 0 ? "+" : ""}${dayValue.pnl}`}
                    </DaysItemValue>
                  </GlassTile>
                  <If condition={!!dayValue.dayNumber}>
                    <DaysItemSubtitle>{dayValue.dayNumber}</DaysItemSubtitle>
                    <Else>
                      <DaysItemSubtitle>-</DaysItemSubtitle>
                    </Else>
                  </If>
                </DaysItem>
              ))}
          </DaysContainer>
        </ListItemContainer>
        <Gap level={2} />
        <If condition={!!deleteTradingAccountErrors.error}>
          <FormError error={deleteTradingAccountErrors?.error} />
          <Gap level={2} />
        </If>
        <HorizontalSection>
          <Button
            text={"Permanently Delete"}
            style={{ backgroundColor: color("SystemRed") }}
            onClick={() =>
              deleteTradingAccount(currentTradingAccount.id.toString())
            }
          />
          <Button
            text={"Cancel"}
            onClick={() => {
              updateDeletingTradingAccountModalOpen(false);
              updateDeleteTradingAccountErrors({});
            }}
          />
        </HorizontalSection>
      </ModalWrapper>
      <Container>
        <ListHeaders>
          <Title>Funded Account Details</Title>
          <BufferHeader>Min Buffer</BufferHeader>
          <BufferHeader>Consistency</BufferHeader>
          <PnLHeader>Withdrawable</PnLHeader>
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
                        onClick={() => {
                          updateEditingFields({
                            editingAccountName: true,
                            editingAccountBalance: false,
                            editingAccountTemplate: false,
                          });
                          updateCurrentTradingAccount({
                            ...originalTradingAccountDetails,
                          } as TradingAccount);
                        }}
                      />
                    </AccountName>
                    <DeleteOutlineIcon
                      style={{
                        height: 20,
                        display: "flex",
                        alignContent: "center",
                      }}
                      onClick={() =>
                        updateDeletingTradingAccountModalOpen(true)
                      }
                    />
                  </AccountNameDeleteContainer>
                  <Else>
                    <AccountName>
                      <Input
                        autoFocus
                        error={currentTradingAccountErrors?.account_name}
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        style={styles.inputStyle}
                        onKeyDown={(ev) => {
                          if (ev.key === "Enter") {
                            updateEditingFields({ editingAccountName: false });
                          }
                          if (ev.key === "Escape") {
                            updateEditingFields({ editingAccountName: false });
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
                        onClick={() => {
                          updateEditingFields({ editingAccountName: false });
                          updateTradingAccount(
                            {
                              ...currentTradingAccount,
                            } as TradingAccount,
                            currentTradingAccount.accountType.id,
                          );
                        }}
                      />
                      <Button
                        style={styles.saveButton}
                        text={"Cancel"}
                        onClick={() => {
                          updateEditingFields({ editingAccountName: false });
                          updateCurrentTradingAccount(
                            originalTradingAccountDetails as TradingAccount,
                          );
                        }}
                      />
                    </AccountName>
                  </Else>
                </If>
                <AccountType>
                  {`Account Type: ${editingAccountTemplate ? "" : currentTradingAccount?.accountType?.name}`}
                  <If condition={!editingAccountTemplate}>
                    <EditIcon
                      style={styles.subtitleEditIcon}
                      onClick={() => {
                        updateEditingFields({
                          editingAccountName: false,
                          editingAccountBalance: false,
                          editingAccountTemplate: true,
                        });
                        updateCurrentTradingAccount({
                          ...originalTradingAccountDetails,
                        } as TradingAccount);
                      }}
                    />
                    <Else>
                      <SelectButtonWrapper>
                        <SelectWrapper
                          selectedValue={currentTradingAccount.accountType.id}
                          onSelect={(selected) => {
                            updateEditingFields({
                              editingAccountTemplate: false,
                            });
                            updateTradingAccount(
                              currentTradingAccount,
                              Number(selected),
                            );
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
                          onClick={() =>
                            updateEditingFields({
                              editingAccountTemplate: false,
                            })
                          }
                        />
                      </SelectButtonWrapper>
                    </Else>
                  </If>
                </AccountType>
                <AccountSubtitle>
                  Balance:
                  <If condition={!editingAccountBalance}>
                    <AccountSubtitleHighlighted>
                      {formatter.format(currentTradingAccount.accountBalance)}
                    </AccountSubtitleHighlighted>
                    <EditIcon
                      style={styles.subtitleEditIcon}
                      onClick={() => {
                        updateEditingFields({
                          editingAccountName: false,
                          editingAccountBalance: true,
                          editingAccountTemplate: false,
                        });
                        updateCurrentTradingAccount({
                          ...originalTradingAccountDetails,
                        } as TradingAccount);
                      }}
                    />
                    <Else>
                      <AccountName>
                        <Input
                          positiveOnly
                          type="number"
                          autoFocus
                          error={currentTradingAccountErrors?.account_balance}
                          containerStyle={styles.containerStyle}
                          inputContainerStyle={styles.inputContainerStyle}
                          style={styles.inputStyle}
                          onKeyDown={(ev) => {
                            if (ev.key === "Enter") {
                              updateEditingFields({
                                editingAccountBalance: false,
                              });
                            }
                            if (ev.key === "Escape") {
                              updateEditingFields({
                                editingAccountBalance: false,
                              });
                            }
                          }}
                          value={
                            decimalStringToInt(
                              currentTradingAccount?.accountBalance,
                            ) || ""
                          }
                          onChange={(e) => {
                            updateCurrentTradingAccount({
                              ...currentTradingAccount,
                              accountBalance: Number(e.target.value),
                            });
                          }}
                        />
                        <Button
                          style={styles.saveButton}
                          text={"Save"}
                          disabled={
                            !currentTradingAccount?.accountBalance ||
                            currentTradingAccount?.accountBalance ===
                              originalTradingAccountDetails?.accountBalance
                          }
                          disabledBlock={
                            !currentTradingAccount?.accountBalance ||
                            currentTradingAccount?.accountBalance ===
                              originalTradingAccountDetails?.accountBalance
                          }
                          onClick={() => {
                            updateTradingAccount(
                              {
                                ...currentTradingAccount,
                              } as TradingAccount,
                              currentTradingAccount.accountType.id,
                            );
                          }}
                        />
                        <Button
                          style={styles.saveButton}
                          text={"Cancel"}
                          onClick={() => {
                            updateEditingFields({
                              editingAccountBalance: false,
                            });
                            updateCurrentTradingAccount(
                              originalTradingAccountDetails as TradingAccount,
                            );
                          }}
                        />
                      </AccountName>
                    </Else>
                  </If>
                </AccountSubtitle>
                <AccountTradingDaysComplete>
                  {`Eligible Days: ${currentTradingAccount?.currentDayCount ?? "N/A"}/${
                    currentTradingAccount?.minTradingDays ?? "N/A"
                  }`}
                  <InfoPopout
                    infoDescription={`This account requires a minimum of ${currentTradingAccount?.minTradingDays} eligible trading days before payout.`}
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
                  <ConsistencyScore
                    $valid={
                      Number(currentTradingAccount?.consistency) <= 0
                        ? true
                        : !!currentTradingAccount?.consistencyScore &&
                          Number(currentTradingAccount?.consistency) > 0 &&
                          currentTradingAccount?.consistencyScore <=
                            Number(currentTradingAccount?.consistency)
                    }
                  >
                    {currentTradingAccount?.consistencyScore?.toFixed(0)}%
                  </ConsistencyScore>
                  <ConsistencyLabel>
                    {"Consistency"}
                    <InfoPopout
                      infoDescription={`% of total profit coming from your largest winning day.`}
                    />
                  </ConsistencyLabel>
                </ConsistencyContainer>
                <PnLContainer>
                  <PnLValue
                    $withdrawable={currentTradingAccount.withdrawableAmount > 0}
                  >
                    {formatter.format(currentTradingAccount.withdrawableAmount)}
                  </PnLValue>
                  <PnLWithdrawable
                    $positive={currentTradingAccount?.postPayoutBuffer > 0}
                  >
                    <PnLWithdrawableText>
                      Post-Payout Buffer:
                    </PnLWithdrawableText>
                    {formatter.format(currentTradingAccount?.postPayoutBuffer)}
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
          <Title>Trade Days</Title>
          <Button
            text={"Record Payout"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"money"}
            textStyle={styles.addButton.text}
            style={styles.payoutButton.button}
            onClick={(): void => {
              updateAddTradeModalOpen(true);
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
              updateAddTradeModalOpen(true);
              setPayoutRecord(false);
              updateSelectedTrade({
                ...initialState.selectedTrade,
                account: {
                  id: Number(!!accountId ? currentTradingAccount?.id : 0),
                },
              } as Trade);
            }}
          />
        </TradingDaysHeaderContainer>
        <GlassTile featureTile minHeight={70} noGlow={true} noShine={false}>
          <TradingDaysContainer>
            {[...currentTradingAccount?.dayValues].map((dayValue, index) => (
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
                      <If condition={!!dayValue.trades[0]?.journalEntry}>
                        <TradePreview
                          $src={dayValue.trades[0]?.journalEntry?.image}
                          onClick={() =>
                            navigation.navigate(PageEnum.JournalEntry, {
                              id:
                                dayValue.trades[0]?.journalEntry?.id.toString() ||
                                "",
                            })
                          }
                        />
                        <TradeJournalPnL
                          $positive={
                            dayValue.trades[0]?.journalEntry?.totalPnl > 0
                          }
                        >
                          ${dayValue.trades[0]?.journalEntry?.totalPnl || 0}
                        </TradeJournalPnL>
                        <Else>
                          <InfoPopout
                            infoDescription={`Link or create journal entry`}
                          >
                            <div>
                              <Icon
                                type={IconTypeEnum.FontAwesome5}
                                name="link"
                                size={30}
                                color={color("SystemLabel1")}
                                style={{ transform: "rotate(135deg)" }}
                              />
                            </div>
                          </InfoPopout>
                        </Else>
                      </If>
                    </TradePreviewContainer>
                    <DayValue>{dayValue.dayNumber || "-"}</DayValue>
                  </PreviewDayValueContainer>
                  <DateContainer>
                    <DaysContainer>
                      {[...dayValue.trades].reverse().map((trade, idx) => (
                        <DaysItem
                          key={idx}
                          onClick={() => {
                            updateAddTradeModalOpen(true);
                            updateSelectedTrade(trade);
                          }}
                        >
                          <GlassTile
                            positive={trade.pnl > 0}
                            featureTile
                            minHeight={10}
                            minWidth={10}
                            padding={7}
                          >
                            <DaysItemValue $positive={trade.pnl > 0}>
                              {`${trade.pnl > 0 ? "+" : ""}${decimalStringToInt(trade.pnl)}`}
                            </DaysItemValue>
                          </GlassTile>
                          <DaysItemSubtitle $smaller>
                            {moment(trade.date).format("hh:mm A")}
                          </DaysItemSubtitle>
                        </DaysItem>
                      ))}
                    </DaysContainer>
                  </DateContainer>
                  <DateContainer>
                    {moment(dayValue.date).format("MMM D, YYYY")}
                  </DateContainer>
                  <PnL $positive={dayValue.pnl >= 0}>
                    {formatter.format(dayValue.pnl)}
                  </PnL>

                  <EditDeleteContainer>
                    <InfoPopout infoDescription="Edit Details">
                      <EditContainer>
                        <EditIcon
                          style={styles.editIcon}
                          onClick={() => {
                            updateSelectedTrade(dayValue.trades[0]);
                            updateAddTradeModalOpen(true);
                          }}
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
