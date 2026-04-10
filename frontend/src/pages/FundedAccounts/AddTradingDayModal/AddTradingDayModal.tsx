import Button from "@components/Button/Button";
import Gap from "@components/Gap/Gap";
import { If } from "@components/If/If";
import Input from "@components/Input/Input";
import { LabelWrapper as Label } from "@components/Label/LabelStyledComponents";
import Modal from "@components/Modal/Modal";
import SelectWrapper from "@components/Select/SelectWrapper";
import Collapse from "@mui/material/Collapse";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import React, { useEffect } from "react";
import useFundedAccountsState from "../hooks/useFundedAccountsState";
import {
  AddTradingDayContainer,
  AddTradingDayContainerLeft,
  AddTradingDayContainerRight,
  AddTradingDayDate,
  DateCalendarContainer,
} from "./AddTradingDayModalStyledComponents";
import styles from "./AddTradingDayModalStyles";
import useGetJournalEntryByDateHandler from "./hooks/useGetJournalEntryByDateHandler";

interface AddTradingDayModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  payoutRecord?: boolean;
}

const AddTradingDayModal: React.FunctionComponent<AddTradingDayModalProps> = ({
  modalOpen,
  setModalOpen,
  payoutRecord,
}) => {
  const { getJournalEntriesByDate } = useGetJournalEntryByDateHandler();
  const { selectedDateJournalEntries } = useFundedAccountsState();
  const [addNewTradePnL, setAddNewTradePnL] = React.useState<boolean>(false);
  const formattedJournalEntries = (selectedDateJournalEntries || []).map(
    (entry) => ({
      name: `${moment(entry.date_time).format("MMMM Do YYYY h:mm A")} - ${entry.trades.length} Account(s)`,
      value: entry.id,
    }),
  );

  const tradeEntryData = [
    {
      name: `61. ${moment().format("MMMM Do YYYY")} - 9:40 EST [x5 accounts]`,
      value: `61`,
    },
    {
      name: `62. ${moment().format("MMMM Do YYYY")} - 9:53 EST [x5 accounts]`,
      value: `62`,
    },
    {
      name: `63. ${moment().format("MMMM Do YYYY")} - 10:11 EST [x4 accounts]`,
      value: `63`,
    },
  ];

  useEffect(() => {
    if (modalOpen) {
      getJournalEntriesByDate(moment().format("YYYY-MM-DD"));
    }
  }, [modalOpen]);

  return (
    <Modal
      title={payoutRecord ? "Record Payout" : "Add Trading Day"}
      open={modalOpen}
      setOpen={setModalOpen}
    >
      <AddTradingDayContainer>
        <AddTradingDayContainerLeft>
          <Label>Select Date</Label>
          <DateCalendarContainer>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateCalendar
                onChange={(date) =>
                  getJournalEntriesByDate(moment(date).format("YYYY-MM-DD"))
                }
              />
            </LocalizationProvider>
          </DateCalendarContainer>
        </AddTradingDayContainerLeft>
        <AddTradingDayContainerRight>
          <Label>Date</Label>
          <AddTradingDayDate>
            {moment().format("MMMM Do YYYY")}
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
              <SelectWrapper
                items={formattedJournalEntries}
                label="Assign to existing Journal Entry"
              />
              <Gap level={2} />
              <Button
                text={"Add New Trade Entry"}
                style={{ ...styles.addTradingDayButton }}
                onClick={(): void => setAddNewTradePnL(!addNewTradePnL)}
              />
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
              <Button
                text={"Assign To Existing Journal Entry (3)"}
                style={{ ...styles.addTradingDayButton }}
                onClick={(): void => setAddNewTradePnL(!addNewTradePnL)}
              />
              <Gap level={1} />
              <Label>Time</Label>
              <DateCalendarContainer>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    sx={{
                      "& .MuiPickersSectionList-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                </LocalizationProvider>
              </DateCalendarContainer>
            </Collapse>
          </If>
          <Gap level={1} />
          <Input
            type="number"
            label={payoutRecord ? "Payout Amount" : "Add Trading Day PnL"}
            value={undefined}
            placeholder={
              payoutRecord ? "Enter Payout Amount" : "Enter Trade PnL"
            }
            onChange={(e) => console.log(e.target.value)}
          />
          <Gap level={1} />
          <If condition={!payoutRecord}>
            <Input
              type="number"
              label="Eligible Trading Day Count"
              value={undefined}
              placeholder="Enter Day Count"
              onChange={(e) => console.log(e.target.value)}
            />
          </If>
          <Gap level={2} />
          <Button
            text={payoutRecord ? "Record Payout" : "Add"}
            style={{
              ...styles.addTradingDayButton,
              ...(payoutRecord ? styles.payoutButton : styles.submitButton),
            }}
            onClick={(): void => setModalOpen(true)}
          />
        </AddTradingDayContainerRight>
      </AddTradingDayContainer>
    </Modal>
  );
};

export default AddTradingDayModal;
