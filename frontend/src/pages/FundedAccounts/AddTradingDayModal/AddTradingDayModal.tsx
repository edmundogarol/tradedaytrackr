import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import { If } from "@components/If/If";
import CalendarPicker from "@components/Input/CalendarPicker/CalendarPicker";
import Input from "@components/Input/Input";
import { LabelWrapper as Label } from "@components/Label/LabelStyledComponents";
import Modal from "@components/Modal/Modal";
import SelectWrapper from "@components/Select/SelectWrapper";
import type { Trade } from "@interfaces/CustomTypes";
import Collapse from "@mui/material/Collapse";
import { color } from "@styles/colors";
import { HorizontalSection } from "@styles/globalStyledComponents";
import { decimalStringToInt, m } from "@utils/utils";
import React, { useEffect } from "react";
import { initialState } from "../FundedAccountsState";
import useFundedAccountsDispatch from "../hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "../hooks/useFundedAccountsState";
import {
  AddTradingDayContainer,
  AddTradingDayContainerLeft,
  AddTradingDayContainerRight,
  AddTradingDayDate,
  DateCalendarContainer,
} from "./AddTradingDayModalStyledComponents";
import styles from "./AddTradingDayModalStyles";
import useAddTradeHandler from "./hooks/useAddTradeHandler";
import useGetJournalEntryByDateHandler from "./hooks/useGetJournalEntryByDateHandler";
import useRecordPayoutHandler from "./hooks/useRecordPayoutHandler";
import useUpdatePayoutHandler from "./hooks/useUpdatePayoutHandler";
import useUpdateTradeHandler from "./hooks/useUpdateTradeHandler";

interface AddTradingDayModalProps {
  payoutRecord?: boolean;
  setPayoutRecord?: (open: boolean) => void;
}

const AddTradingDayModal: React.FunctionComponent<AddTradingDayModalProps> = ({
  payoutRecord,
  setPayoutRecord,
}) => {
  const { getJournalEntriesByDate } = useGetJournalEntryByDateHandler();
  const {
    currentTradingAccount,
    selectedDateJournalEntries,
    addTradeModalOpen,
    selectedTrade,
    addTradeErrors,
  } = useFundedAccountsState();

  const editingExistingTrade = selectedTrade.id !== 0;

  const {
    updateSelectedTrade,
    updateAddTradeErrors,
    updateAddTradeModalOpen,
    updateDeleteTradeModalOpen,
  } = useFundedAccountsDispatch();

  const [addNewTradePnL, setAddNewTradePnL] =
    React.useState<boolean>(editingExistingTrade);

  const [originalTrade, setOriginalTrade] = React.useState<Trade>(
    initialState.selectedTrade,
  );

  const formattedJournalEntries = (selectedDateJournalEntries || []).map(
    (entry) => ({
      name: `${m(entry.dateTime).format("MMMM Do YYYY h:mm A")} - ${entry.trades.length} Account(s)`,
      value: entry.id,
    }),
  );

  const { addTrade, loading: addingTrade } = useAddTradeHandler();
  const { updateTrade, loading: updatingTrade } = useUpdateTradeHandler();
  const { recordPayout, loading: recordingPayout } = useRecordPayoutHandler();
  const { updatePayout, loading: updatingPayout } = useUpdatePayoutHandler();

  useEffect(() => {
    if (editingExistingTrade) {
      setAddNewTradePnL(true);
    }
  }, [editingExistingTrade]);

  const selectedDay = m(selectedTrade.date).format("YYYY-MM-DD");

  useEffect(() => {
    if (addTradeModalOpen) {
      setOriginalTrade(selectedTrade);
    }
    if (payoutRecord) {
      updateSelectedTrade({
        ...initialState.selectedTrade,
        account: {
          id: currentTradingAccount.id,
        },
      } as Trade);
    }
  }, [addTradeModalOpen]);

  useEffect(() => {
    if (addTradeModalOpen) {
      getJournalEntriesByDate(selectedDay);
    }
  }, [addTradeModalOpen, selectedDay]);

  useEffect(() => {
    if (!addNewTradePnL) {
      updateSelectedTrade({
        ...selectedTrade,
        journalEntry: {
          id: 0,
        },
      } as Trade);
    }
  }, [addNewTradePnL]);

  useEffect(() => {
    if (addNewTradePnL || payoutRecord) return;
    if (selectedDateJournalEntries.length === 0) return;
    if (selectedTrade.journalEntry?.id) return;

    const first = selectedDateJournalEntries[0];

    const baseDate = m(selectedTrade.date);
    const entryMoment = m(first.dateTime);

    const merged = baseDate
      .hour(entryMoment.hour())
      .minute(entryMoment.minute())
      .second(entryMoment.second());

    updateSelectedTrade({
      ...selectedTrade,
      journalEntry: {
        id: first.id,
      },
      date: merged.format("YYYY-MM-DDTHH:mm:ss"),
    } as Trade);
  }, [selectedDateJournalEntries, addNewTradePnL]);

  const dirtyTrade =
    selectedTrade.pnl !== originalTrade.pnl ||
    selectedTrade.date !== originalTrade.date;

  return (
    <Modal
      title={
        payoutRecord
          ? "Record Payout"
          : editingExistingTrade
            ? selectedTrade.isPayout
              ? "Edit Payout"
              : "Edit Trade"
            : "Add Trade"
      }
      open={addTradeModalOpen}
      setOpen={updateAddTradeModalOpen}
      onClose={() => {
        updateAddTradeErrors({});
        if (setPayoutRecord) setPayoutRecord(false);
      }}
    >
      <AddTradingDayContainer>
        <AddTradingDayContainerLeft>
          <Label>Select Date</Label>
          <DateCalendarContainer>
            <CalendarPicker
              showSaveButton={false}
              inline
              showPicker
              value={m(selectedTrade.date)}
              onChange={(date) => {
                updateSelectedTrade({
                  ...selectedTrade,
                  date: m(date).format("YYYY-MM-DDTHH:mm:ssZ"),
                });
              }}
            />
          </DateCalendarContainer>
        </AddTradingDayContainerLeft>

        <AddTradingDayContainerRight>
          <Label>Date</Label>
          <AddTradingDayDate>
            {m(selectedTrade.date).format("MMMM Do YYYY")}
          </AddTradingDayDate>

          <Gap level={1} />

          <If condition={!payoutRecord}>
            <Collapse
              sx={{ "& .MuiCollapse-wrapperInner": { width: "100%" } }}
              orientation="horizontal"
              in={!addNewTradePnL}
              collapsedSize={0}
              hidden={addNewTradePnL}
            >
              <If condition={formattedJournalEntries.length > 0}>
                <SelectWrapper
                  onSelect={(selectedId) => {
                    const selected = selectedDateJournalEntries.find(
                      (entry) => entry.id === Number(selectedId),
                    );

                    if (!selected) return;

                    const baseDate = m(selectedTrade.date);
                    const entryMoment = m(selected.dateTime);

                    const merged = baseDate
                      .hour(entryMoment.hour())
                      .minute(entryMoment.minute())
                      .second(entryMoment.second());

                    updateSelectedTrade({
                      ...selectedTrade,
                      journalEntry: {
                        id: selected.id,
                      },
                      date: merged.toISOString(),
                    } as Trade);
                  }}
                  items={formattedJournalEntries}
                  label="Journal Entries detected for this date"
                />
              </If>

              <Gap level={1} />

              <If condition={formattedJournalEntries.length > 0}>
                <Button
                  text={"Do not link to existing journal entry"}
                  style={{
                    ...styles.addTradingDayButton,
                    ...styles.dontLinkButton,
                  }}
                  onClick={(): void => {
                    setAddNewTradePnL(!addNewTradePnL);
                    updateSelectedTrade({
                      ...selectedTrade,
                      journalEntry: {
                        id: 0,
                      },
                    } as Trade);
                  }}
                />
              </If>
            </Collapse>

            <Collapse
              sx={{ "& .MuiCollapse-wrapperInner": { width: "100%" } }}
              orientation="horizontal"
              in={addNewTradePnL}
              collapsedSize={0}
              hidden={!addNewTradePnL}
            >
              <If condition={formattedJournalEntries.length > 0}>
                <Button
                  text={`Assign To Existing Journal Entry (${formattedJournalEntries.length})`}
                  style={{ ...styles.addTradingDayButton }}
                  onClick={(): void => setAddNewTradePnL(!addNewTradePnL)}
                />
                <Gap level={1} />
              </If>
            </Collapse>
          </If>

          <Gap level={1} />

          <Input
            positiveOnly={payoutRecord}
            error={addTradeErrors?.pnl || addTradeErrors?.amount}
            type="number"
            label={
              payoutRecord
                ? "Payout Amount"
                : selectedTrade.isPayout
                  ? "Payout Amount"
                  : editingExistingTrade
                    ? "Edit Trade PnL"
                    : "Add Trade PnL"
            }
            value={decimalStringToInt(selectedTrade.pnl)}
            placeholder={
              payoutRecord
                ? "Enter Payout Amount"
                : selectedTrade.isPayout
                  ? "Enter Payout Amount"
                  : editingExistingTrade
                    ? "Update Trade PnL"
                    : "Enter Trade PnL"
            }
            onChange={(e) =>
              updateSelectedTrade({
                ...selectedTrade,
                pnl: Number(e.target.value),
              })
            }
          />

          <Gap level={1} />

          <FormError error={addTradeErrors?.error} />

          <HorizontalSection>
            <Button
              style={{
                ...styles.addTradingDayButton,
                ...(payoutRecord ? styles.payoutButton : styles.submitButton),
                ...(!dirtyTrade ? {} : styles.greenButton),
              }}
              disabledBlock={!dirtyTrade}
              disabled={!dirtyTrade}
              loading={
                addingTrade ||
                updatingTrade ||
                recordingPayout ||
                updatingPayout
              }
              text={
                payoutRecord
                  ? "Record Payout"
                  : editingExistingTrade
                    ? "Save"
                    : "Add"
              }
              onClick={(): void => {
                if (editingExistingTrade) {
                  if (selectedTrade.isPayout) {
                    updatePayout(selectedTrade);
                    return;
                  }
                  updateTrade(selectedTrade);
                } else {
                  if (payoutRecord) {
                    recordPayout(selectedTrade);
                    return;
                  }
                  addTrade(selectedTrade);
                }
              }}
            />

            <If condition={editingExistingTrade && !payoutRecord}>
              <Button
                text={selectedTrade.isPayout ? "Delete Payout" : "Delete Trade"}
                style={{ backgroundColor: color("SystemRed") }}
                onClick={() => {
                  updateDeleteTradeModalOpen(true);
                }}
              />
            </If>
          </HorizontalSection>
        </AddTradingDayContainerRight>
      </AddTradingDayContainer>
    </Modal>
  );
};

export default AddTradingDayModal;
