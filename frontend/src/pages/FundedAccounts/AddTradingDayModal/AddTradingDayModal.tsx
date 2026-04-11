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
import { decimalStringToInt } from "@utils/utils";
import moment from "moment";
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
import useUpdateTradeHandler from "./hooks/useUpdateTradeHandler";

interface AddTradingDayModalProps {
  payoutRecord?: boolean;
}

const AddTradingDayModal: React.FunctionComponent<AddTradingDayModalProps> = ({
  payoutRecord,
}) => {
  const { getJournalEntriesByDate } = useGetJournalEntryByDateHandler();
  const {
    selectedDateJournalEntries,
    addTradeModalOpen,
    selectedTrade,
    addTradeErrors,
  } = useFundedAccountsState();
  const editingExistingTrade = selectedTrade.id !== 0;
  const { updateSelectedTrade, updateAddTradeErrors, updateAddTradeModalOpen } =
    useFundedAccountsDispatch();
  const [addNewTradePnL, setAddNewTradePnL] =
    React.useState<boolean>(editingExistingTrade);
  const [originalTrade, setOriginalTrade] = React.useState<Trade>(
    initialState.selectedTrade,
  );
  const formattedJournalEntries = (selectedDateJournalEntries || []).map(
    (entry) => ({
      name: `${moment(entry.dateTime).format("MMMM Do YYYY h:mm A")} - ${entry.trades.length} Account(s)`,
      value: entry.id,
    }),
  );
  const { addTrade, loading: addingTrade } = useAddTradeHandler();
  const { updateTrade, loading: updatingTrade } = useUpdateTradeHandler();
  useEffect(() => {
    if (selectedTrade.id === 0) {
      setOriginalTrade(selectedTrade);
    }
    if (editingExistingTrade) {
      setAddNewTradePnL(true);
    }
  }, [editingExistingTrade]);

  useEffect(() => {
    if (addTradeModalOpen) {
      getJournalEntriesByDate(moment(selectedTrade.date).format("YYYY-MM-DD"));
    }
  }, [addTradeModalOpen, selectedTrade.date]);

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
    if (addNewTradePnL) return;
    if (selectedDateJournalEntries.length === 0) return;

    const selected =
      selectedDateJournalEntries.find(
        (entry) => entry.id === selectedTrade.journalEntry?.id,
      ) || selectedDateJournalEntries[0];

    updateSelectedTrade({
      ...selectedTrade,
      journalEntry: {
        id: selected.id,
      },
      date: selected.dateTime,
    } as Trade);
  }, [selectedDateJournalEntries, addNewTradePnL]);

  const dirtyTrade =
    selectedTrade.pnl !== originalTrade.pnl ||
    selectedTrade.date !== originalTrade.date ||
    selectedTrade.journalEntry?.id !== originalTrade.journalEntry?.id;

  return (
    <Modal
      title={
        payoutRecord
          ? "Record Payout"
          : editingExistingTrade
            ? "Edit Trade"
            : "Add Trade"
      }
      open={addTradeModalOpen}
      setOpen={updateAddTradeModalOpen}
      onClose={() => {
        updateSelectedTrade(initialState.selectedTrade);
        updateAddTradeErrors({});
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
              value={moment(selectedTrade.date)}
              onChange={(date) => {
                updateSelectedTrade({
                  ...selectedTrade,
                  date: moment(date).toISOString(),
                });
              }}
            />
          </DateCalendarContainer>
        </AddTradingDayContainerLeft>
        <AddTradingDayContainerRight>
          <Label>Date</Label>
          <AddTradingDayDate>
            {moment(selectedTrade.date).format("MMMM Do YYYY")}
          </AddTradingDayDate>
          <Gap level={1} />
          <If condition={!payoutRecord}>
            <Collapse
              sx={{
                "& .MuiCollapse-wrapperInner": {
                  width: "100%",
                },
              }}
              orientation="horizontal"
              in={!addNewTradePnL}
              collapsedSize={0}
              hidden={addNewTradePnL}
            >
              <If condition={formattedJournalEntries.length > 0}>
                <SelectWrapper
                  onSelect={(selected) => {
                    updateSelectedTrade({
                      ...selectedTrade,
                      journalEntry: {
                        id: Number(selected),
                      },
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
                      ...originalTrade,
                      date: moment(selectedTrade.date).toISOString(),
                      journalEntry: {
                        id: 0,
                      },
                    } as Trade);
                  }}
                />
              </If>
            </Collapse>
            <Collapse
              sx={{
                "& .MuiCollapse-wrapperInner": {
                  width: "100%",
                },
              }}
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
            error={addTradeErrors?.pnl}
            type="number"
            label={payoutRecord ? "Payout Amount" : "Add Trade PnL"}
            value={decimalStringToInt(selectedTrade.pnl)}
            placeholder={
              payoutRecord ? "Enter Payout Amount" : "Enter Trade PnL"
            }
            onChange={(e) =>
              updateSelectedTrade({
                ...selectedTrade,
                pnl: Number(e.target.value),
              })
            }
          />
          {/* <Gap level={1} />
          <If condition={!payoutRecord}>
            <Input
              type="number"
              label="Eligible Trading Day Count"
              value={undefined}
              placeholder="Enter Day Count"
              onChange={(e) => console.log(e.target.value)}
            />
          </If> */}
          <Gap level={1} />
          <FormError error={addTradeErrors?.error} />
          <Button
            style={{
              ...styles.addTradingDayButton,
              ...(payoutRecord ? styles.payoutButton : styles.submitButton),
              ...(!dirtyTrade ? {} : styles.greenButton),
            }}
            disabledBlock={!dirtyTrade}
            disabled={!dirtyTrade}
            loading={addingTrade || updatingTrade}
            text={
              payoutRecord
                ? "Record Payout"
                : editingExistingTrade
                  ? "Save"
                  : "Add"
            }
            onClick={(): void => {
              if (editingExistingTrade) {
                updateTrade(selectedTrade);
              } else {
                addTrade(selectedTrade);
              }
            }}
          />
        </AddTradingDayContainerRight>
      </AddTradingDayContainer>
    </Modal>
  );
};

export default AddTradingDayModal;
