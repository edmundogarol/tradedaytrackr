import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import FormInfo from "@components/Error/FormInfo/FormInfo";
import Gap from "@components/Gap/Gap";
import { If } from "@components/If/If";
import CalendarPicker from "@components/Input/CalendarPicker/CalendarPicker";
import Input from "@components/Input/Input";
import { LabelWrapper as Label } from "@components/Label/LabelStyledComponents";
import Modal from "@components/Modal/Modal";
import SelectWrapper from "@components/Select/SelectWrapper";
import type { Trade } from "@interfaces/CustomTypes";
import Collapse from "@mui/material/Collapse";
import useAddTradeHandler from "@pages/FundedAccounts/AddTradingDayModal/hooks/useAddTradeHandler";
import useGetJournalEntryByDateHandler from "@pages/FundedAccounts/AddTradingDayModal/hooks/useGetJournalEntryByDateHandler";
import useUpdateTradeHandler from "@pages/FundedAccounts/AddTradingDayModal/hooks/useUpdateTradeHandler";
import { initialState } from "@pages/FundedAccounts/FundedAccountsState";
import useFundedAccountsDispatch from "@pages/FundedAccounts/hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import { color } from "@styles/colors";
import { HorizontalSection } from "@styles/globalStyledComponents";
import { decimalStringToInt, m } from "@utils/utils";
import React, { useEffect } from "react";
import {
  AddTradingDayContainer,
  AddTradingDayContainerLeft,
  AddTradingDayContainerRight,
  AddTradingDayDate,
  DateCalendarContainer,
} from "./AddTradingDayModalStyledComponents";
import styles from "./AddTradingDayModalStyles";

const AddTradingDayModal: React.FunctionComponent = () => {
  const { getJournalEntriesByDate } = useGetJournalEntryByDateHandler();
  const {
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
      name: `${m(entry.dateTime).format("MMMM Do YYYY h:mm A")} - ${entry.tradeIds.length} Account(s)`,
      value: entry.id,
    }),
  );

  const { addTrade, loading: addingTrade } = useAddTradeHandler();
  const { updateTrade, loading: updatingTrade } = useUpdateTradeHandler();

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
  }, [addTradeModalOpen]);

  useEffect(() => {
    if (addTradeModalOpen) {
      getJournalEntriesByDate(selectedDay);
    }
  }, [addTradeModalOpen, selectedDay]);

  useEffect(() => {
    if (addNewTradePnL) return;
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
      date: m(merged).format(),
    } as Trade);
  }, [selectedDateJournalEntries, addNewTradePnL]);

  useEffect(() => {
    if (!!selectedTrade?.journalEntry?.id) {
      setAddNewTradePnL(false);
    }
  }, [selectedTrade?.journalEntry?.id, addTradeModalOpen]);

  const dirtyTrade =
    selectedTrade.pnl !== originalTrade.pnl ||
    selectedTrade.date !== originalTrade.date ||
    selectedTrade.journalEntry?.id !== originalTrade.journalEntry?.id;

  return (
    <Modal
      title={
        editingExistingTrade
          ? selectedTrade.isPayout
            ? "Edit Payout"
            : "Edit Trade"
          : "Add Trade"
      }
      open={addTradeModalOpen}
      setOpen={updateAddTradeModalOpen}
      onClose={() => {
        updateAddTradeErrors({});
      }}
    >
      <Gap level={1} />
      <FormInfo detail="Linking evaluation trades to journal entries will not affect the funded journal entry PnL." />
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

          <Collapse
            sx={{ "& .MuiCollapse-wrapperInner": { width: "100%" } }}
            orientation="horizontal"
            in={!addNewTradePnL}
            collapsedSize={0}
            hidden={addNewTradePnL}
          >
            <If condition={formattedJournalEntries.length > 0}>
              <SelectWrapper
                selectedValue={selectedTrade?.journalEntry?.id}
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
                    date: m(merged).format(),
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
                    journalEntry: null,
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

          <Gap level={1} />

          <Input
            error={addTradeErrors?.pnl}
            type="number"
            label={
              selectedTrade.isPayout
                ? "Payout Amount"
                : editingExistingTrade
                  ? "Edit Trade PnL"
                  : "Add Trade PnL"
            }
            value={decimalStringToInt(selectedTrade.pnl)}
            placeholder={
              editingExistingTrade ? "Update Trade PnL" : "Enter Trade PnL"
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
                ...styles.submitButton,
                ...(!dirtyTrade ? {} : styles.greenButton),
              }}
              disabledBlock={!dirtyTrade}
              disabled={!dirtyTrade}
              loading={addingTrade || updatingTrade}
              text={editingExistingTrade ? "Save" : "Add"}
              onClick={(): void => {
                if (editingExistingTrade) {
                  updateTrade(selectedTrade);
                } else {
                  addTrade(selectedTrade);
                }
              }}
            />

            <If condition={editingExistingTrade}>
              <Button
                text={"Delete Trade"}
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
