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
import {
  AccountSubtitle,
  AccountSubtitleHighlighted,
  AccountTradingDaysComplete,
  DaysContainer,
  DaysItem,
  DaysItemValue,
  Status,
  StatusContainer,
} from "@pages/EvaluationAccounts/EvaluationAccountsStyledComponents";
import { color } from "@styles/colors";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import AlertPopout from "@components/Alert/AlertPopout";
import type {
  EvaluationAccount,
  TradingAccount,
} from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import DeleteTradeModal from "@pages/FundedAccounts/DeleteTradeModal/DeleteTradeModal";
import DeleteTradingAccountModal from "@pages/FundedAccounts/DeleteTradingAccountModal/DeleteTradingAccountModal";
import {
  AccountNameDeleteContainer,
  ConsistencyScore,
  SelectButtonWrapper,
  TradeJournalPnL,
  TradePreview,
} from "@pages/FundedAccounts/FundedAccountDetail/FundedAccountDetailStyledComponents";
import { DaysItemSubtitle } from "@pages/FundedAccounts/FundedAccountsStyledComponents";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import useGetTradingAccountDetailHandler from "@pages/FundedAccounts/hooks/useGetTradingAccountDetailHandler";
import useUpdateTradingAccountHandler from "@pages/FundedAccounts/hooks/useUpdateTradingAccountHandler";
import useGetFundedAccountTemplates from "@pages/Settings/hooks/useGetFundedAccountTemplates";
import useGetAccountTemplatesHandler from "@pages/Settings/Preferences/hooks/useGetAccountTemplatesHandler";
import { BorderLinearProgress } from "@styles/globalStyledComponents";
import { decimalStringToInt, formatter, m } from "@utils/utils";
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
import {
  AccountDetailContainer,
  AccountName,
  AccountNameContainer,
  AccountPerformanceContainer,
  AccountType,
  BufferHeader,
  ConsistencyContainer,
  ConsistencyLabel,
  DateContainer,
  DayValue,
  EditContainer,
  EditDeleteContainer,
  HeaderContainer,
  ListHeaders,
  PnL,
  PnLHeader,
  PreviewDayValueContainer,
  TradeDay,
  TradePreviewContainer,
  TradingDaysContainer,
  TradingDaysHeaderContainer,
} from "./EvaluationAccountDetailStyledComponents";
import styles from "./EvaluationAccountDetailStyles";
interface EvaluationAccountDetailProps {}

const EvaluationAccountDetail: React.FunctionComponent<
  EvaluationAccountDetailProps
> = () => {
  const {
    currentTradingAccount,
    tradingAccounts,
    currentTradingAccountErrors,
    editingAccountBalance,
    editingAccountName,
    editingAccountTemplate,
    addTradeErrors,
    deleteTradeErrors,
    addTradeModalOpen,
  } = useFundedAccountsState();
  const {
    updateCurrentTradingAccount,
    updateCurrentTradingAccountErrors,
    updateEditingFields,
    updateDeletingTradingAccountModalOpen,
    updateAddTradeErrors,
    updateAddTradeModalOpen,
    updateSelectedTrade,
    updateDeleteTradeModalOpen,
    updateDeleteTradeErrors,
  } = useFundedAccountsDispatch();
  let [searchParams] = useSearchParams();
  const accountId = searchParams.get("id");
  const [originalTradingAccountDetails, setOriginalTradingAccountDetails] =
    useState<TradingAccount | EvaluationAccount | null>(null);
  const navigation = useReactNavigation();
  const accountTemplateList = useGetFundedAccountTemplates();
  const { getAccountTemplates } = useGetAccountTemplatesHandler();
  const { updateTradingAccount } = useUpdateTradingAccountHandler();
  const { getTradingAccount } = useGetTradingAccountDetailHandler();
  const hasFetched = useRef(false);
  const evalProgressStatus = useGetEvalProgressStatus();

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
    const selectedAccount =
      currentTradingAccount.id !== 0
        ? currentTradingAccount
        : tradingAccounts.find((account) => account.id === Number(accountId));
    if (currentTradingAccount.id === selectedAccount?.id) return;
    if (accountId && selectedAccount) {
      updateCurrentTradingAccount(selectedAccount);
      setOriginalTradingAccountDetails(selectedAccount);
    }
  }, [tradingAccounts, accountId, addTradeModalOpen]);

  console.log({ currentTradingAccount });

  const accountProgress =
    ((currentTradingAccount?.accountBalance -
      currentTradingAccount?.accountSize) /
      (currentTradingAccount?.profitTarget || 1)) *
    100;
  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        open={!!deleteTradeErrors?.detail}
        hideDuration={6000}
        message={deleteTradeErrors?.detail}
        setPopoutOpen={() => updateDeleteTradeErrors({})}
      />
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
      <AddTradingDayModal />
      <DeleteTradingAccountModal />
      <DeleteTradeModal />
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
                    Profit Target:
                    <BufferAmountHighlighted $bufferPercent={accountProgress}>
                      {formatter.format(
                        currentTradingAccount?.accountBalance -
                          currentTradingAccount?.accountSize,
                      )}
                    </BufferAmountHighlighted>
                    /
                    <BufferAmount>
                      {formatter.format(
                        currentTradingAccount?.profitTarget || 0,
                      )}
                    </BufferAmount>
                    <InfoPopout
                      infoDescription={`This account has a profit target of ${formatter.format(currentTradingAccount?.profitTarget || 0)}`}
                    />
                  </BufferText>
                  <BorderLinearProgress
                    $bufferPercent={accountProgress}
                    variant="determinate"
                    value={
                      accountProgress > 100
                        ? 100
                        : accountProgress < 0
                          ? 0
                          : accountProgress
                    }
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
                <StatusContainer>
                  <Status $bufferPercent={accountProgress}>
                    {evalProgressStatus(accountProgress)}
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
          <Title>Trade Days</Title>
          <Button
            text={"Add Trade"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
            onClick={(): void => {
              updateAddTradeModalOpen(true);
            }}
          />
        </TradingDaysHeaderContainer>
        <GlassTile featureTile minHeight={70} noGlow={true} noShine={false}>
          <TradingDaysContainer>
            {[...currentTradingAccount?.dayValues].map((dayValue, index) => {
              const tradeWithJournalEntry = dayValue.trades.find(
                (trade) => !!trade?.journalEntry?.id,
              );
              return (
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
                        {!!tradeWithJournalEntry?.journalEntry ? (
                          <If
                            condition={
                              !!tradeWithJournalEntry &&
                              !!tradeWithJournalEntry?.journalEntry
                            }
                          >
                            <TradePreview
                              $src={tradeWithJournalEntry?.journalEntry?.image}
                              onClick={() =>
                                navigation.navigate(PageEnum.JournalEntry, {
                                  id:
                                    tradeWithJournalEntry?.journalEntry?.id.toString() ||
                                    "",
                                })
                              }
                            />
                            <TradeJournalPnL
                              $positive={
                                tradeWithJournalEntry?.journalEntry?.totalPnl >
                                0
                              }
                            >
                              $
                              {tradeWithJournalEntry?.journalEntry?.totalPnl ||
                                0}
                            </TradeJournalPnL>
                          </If>
                        ) : (
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
                        )}
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
                              positive={(trade.pnl ?? 0) > 0}
                              featureTile
                              minHeight={10}
                              minWidth={10}
                              padding={7}
                            >
                              <DaysItemValue $positive={(trade.pnl ?? 0) > 0}>
                                {`${(trade.pnl ?? 0) > 0 ? "+" : ""}${decimalStringToInt(trade.pnl ?? 0)}`}
                              </DaysItemValue>
                            </GlassTile>
                            <DaysItemSubtitle $smaller>
                              {m(trade.date).format("hh:mm A")}
                            </DaysItemSubtitle>
                          </DaysItem>
                        ))}
                      </DaysContainer>
                    </DateContainer>
                    <DateContainer>
                      {m(dayValue.date).format("MMM D, YYYY")}
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
                              if (dayValue.trades.length > 1) {
                                updateDeleteTradeErrors({
                                  detail:
                                    "This trade day has multiple trades. Please edit individual records from trades displayed on this row",
                                });
                                return;
                              }
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
                            onClick={() => {
                              if (dayValue.trades.length > 1) {
                                updateDeleteTradeErrors({
                                  detail:
                                    "This trade day has multiple trades. Please delete individual records from trades displayed on this row",
                                });
                                return;
                              }
                              updateDeleteTradeModalOpen(true);
                              updateSelectedTrade(dayValue.trades[0]);
                            }}
                          />
                        </EditContainer>
                      </InfoPopout>
                    </EditDeleteContainer>
                  </TradeDay>
                </GlassTile>
              );
            })}
          </TradingDaysContainer>
        </GlassTile>
      </Container>
    </Page>
  );
};

export default EvaluationAccountDetail;
