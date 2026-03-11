import React, { useState } from "react";
import type { Moment } from "moment";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CancelIcon from "@mui/icons-material/Cancel";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { u } from "react-router/dist/development/index-react-server-client-Cv5Q9lf0";
import { Button } from "@mui/material";
import styles from "./CalendarPickerStyles";
import {
  CloseIconContainer,
  Container,
} from "./CalendarPickerStyledComponents";

export interface CalendarPickerProps {
  children?: React.ReactNode;
  value?: moment.Moment | null;
  onChange?: (date: Date | null) => void;
  showPicker: boolean;
  onSaveCallback: (open: boolean) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  children,
  value,
  onChange,
  showPicker,
  onSaveCallback,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  return (
    <Container>
      {!!children && children}
      <Popper
        anchorEl={anchorEl}
        open={showPicker}
        disablePortal
        sx={{
          zIndex: 12,
          pointerEvents: "auto",
          top: "unset !important",
          left: "unset !important",
        }}
      >
        <Paper style={styles.paperStyle}>
          <Typography sx={styles.contentStyle}>
            <CloseIconContainer
              onClick={() => {
                onSaveCallback(false);
                onChange?.(value ? value.toDate() : null);
              }}
            >
              <CancelIcon />
            </CloseIconContainer>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateCalendar
                value={
                  selectedDate
                    ? moment(selectedDate)
                    : value
                      ? moment(value)
                      : null
                }
                onChange={(newValue: Moment | null) => {
                  setSelectedDate(newValue);
                }}
              />
              <TimePicker
                value={
                  selectedDate
                    ? moment(selectedDate)
                    : value
                      ? moment(value)
                      : null
                }
                onChange={(newValue: Moment | null) => {
                  setSelectedDate(newValue);
                }}
                sx={{
                  "& .MuiPickersSectionList-root": {
                    fontSize: 15,
                  },
                }}
              />
              <Button
                onClick={() => {
                  onSaveCallback(false);
                  onChange?.(selectedDate ? selectedDate.toDate() : null);
                }}
              >
                Save
              </Button>
            </LocalizationProvider>
          </Typography>
        </Paper>
      </Popper>
    </Container>
  );
};

export default CalendarPicker;
