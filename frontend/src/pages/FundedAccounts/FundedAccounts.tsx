import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import StatsSummary from "@components/Stats/StatsSummary/StatsSummary";
import DropdownMultiselect from "@components/DropdownMultiselect/DropdownMultiselect";
import Button from "@components/Button/Button";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import SelectWrapper from "@components/Select/SelectWrapper";
import Modal from "@components/Modal/Modal";
import Input from "@components/Input/Input";
import { LabelWrapper as Label } from "@components/Label/LabelStyledComponents";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import moment from "moment";
import { If } from "@components/If/If";
import Collapse from "@mui/material/Collapse";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Container,
  DropdownsSection,
  ListContainer,
  ListHeaders,
  AccountHeader,
  BufferHeader,
  DaysHeader,
  PnLHeader,
  Title,
  DateCalendarContainer,
  AddTradingDayContainerLeft,
  AddTradingDayContainerRight,
  AddTradingDayContainer,
  AddTradingDayDate,
  AddFundedAccountContainer,
} from "./FundedAccountsStyledComponents";
import useGetFundedAccountsStatsSummaryDetails from "./hooks/useGetFundedAccountsStatsSummaryDetails";
import useGetFundedAccountsList from "./hooks/useGetFundedAccountsList";
import ListItem from "./FundedAccountsListItem";
import styles from "./FundedAccountsStyles";

const FundedAccounts: React.FunctionComponent = () => {
  const fundedStatsSummaryDetails = useGetFundedAccountsStatsSummaryDetails();
  const firmsList = ["My Funded Futures", "Apex", "Bulenox", "Alpha Futures"];
  const accountTemplateList = [
    "MFFU 50k Flex",
    "MFFU 50k Rapid",
    "Apex 50k",
    "Bulenox 50k",
    "Alpha Futures Zero 50k",
  ];
  const tradeEntryData = [
    `61. ${moment().format("MMMM Do YYYY")} - 9:40 EST [x5 accounts]`,
    `62. ${moment().format("MMMM Do YYYY")} - 9:53 EST [x5 accounts]`,
    `63. ${moment().format("MMMM Do YYYY")} - 10:11 EST [x4 accounts]`,
  ];
  const bufferState = ["< 20%", "> 50%", "> 90%", "Complete"];
  const [modalOpen, setModalOpen] = React.useState<boolean>(true);
  const [addTradingDayOpen, setAddTradingDayOpen] =
    React.useState<boolean>(false);
  const [addNewTradePnL, setAddNewTradePnL] = React.useState<boolean>(false);

  const accountsList = useGetFundedAccountsList();
  return (
    <Page topBarShowMenu={true}>
      <Modal
        title="Add Trading Day"
        open={addTradingDayOpen}
        setOpen={setAddTradingDayOpen}
      >
        <AddTradingDayContainer>
          <AddTradingDayContainerLeft>
            <Label>Select Date</Label>
            <DateCalendarContainer>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateCalendar />
              </LocalizationProvider>
            </DateCalendarContainer>
          </AddTradingDayContainerLeft>
          <AddTradingDayContainerRight>
            <Label>Date</Label>
            <AddTradingDayDate>
              {moment().format("MMMM Do YYYY")}
            </AddTradingDayDate>
            <Gap level={1} />
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
                items={tradeEntryData}
                label="Assign to existing trade entry"
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
                text={"Assign To Existing Entry (3)"}
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
            <Gap level={1} />
            <Input
              type="number"
              label="Account Trade PnL"
              value={undefined}
              placeholder="Enter Trade PnL"
              onChange={(e) => console.log(e.target.value)}
            />
            <Gap level={1} />
            <Input
              type="number"
              label="Eligible Trading Day Count"
              value={undefined}
              placeholder="Enter Day Count"
              onChange={(e) => console.log(e.target.value)}
            />
            <Gap level={2} />
            <Button
              text={"Add"}
              style={{ ...styles.addTradingDayButton, ...styles.submitButton }}
              onClick={(): void => setModalOpen(true)}
            />
          </AddTradingDayContainerRight>
        </AddTradingDayContainer>
      </Modal>
      <Modal title="Add Funded Account" open={modalOpen} setOpen={setModalOpen}>
        <AddFundedAccountContainer>
          <SelectWrapper
            items={accountTemplateList}
            label="Select Account Template"
          />
          <Gap level={2} />
          <Input
            label="Account Name"
            value={undefined}
            placeholder="Enter Account Name"
            onChange={(e) => console.log(e.target.value)}
          />
          <Gap level={2} />
          <Input
            type="number"
            label="Account Balance"
            value={undefined}
            placeholder="Enter Account Balance"
            onChange={(e) => console.log(e.target.value)}
          />
          <Gap level={2} />
          <Label>Trading Day</Label>
          <Button
            text={"Add Trading Day"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addTradingDayButton}
            style={styles.addTradingDayButton}
            onClick={(): void => setAddTradingDayOpen(true)}
          />
          <Gap level={2} />

          <Button
            text={"Save"}
            style={{ ...styles.addTradingDayButton, ...styles.submitButton }}
            onClick={(): void => setModalOpen(false)}
          />
        </AddFundedAccountContainer>
      </Modal>
      <Container>
        <Title>Funded Accounts</Title>
        <StatsSummary
          statsSummaryTilesDetails={fundedStatsSummaryDetails}
          featureTiles
        />
        <Gap level={2} />
        <DropdownsSection>
          <DropdownMultiselect
            items={firmsList.concat(firmsList)}
            title="All Firms"
          />
          <DropdownMultiselect items={bufferState} title="Buffer Built" />
          <Button
            text={"Add Funded"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
            onClick={(): void => setModalOpen(true)}
          />
        </DropdownsSection>
        <ListHeaders>
          <AccountHeader>Account</AccountHeader>
          <DaysHeader>Trading Days</DaysHeader>
          <BufferHeader>Min Buffer</BufferHeader>
          <PnLHeader>PnL</PnLHeader>
        </ListHeaders>
        <ListContainer>
          {accountsList.map((account, index) => (
            <ListItem key={index} {...account} />
          ))}
        </ListContainer>
      </Container>
    </Page>
  );
};

export default FundedAccounts;
