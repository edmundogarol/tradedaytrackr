import { Else, If } from "@components/If/If";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import type { Moment } from "moment";
import moment from "moment";
import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import {
  CloseIconContainer,
  Container,
} from "./CalendarPickerStyledComponents";
import styles from "./CalendarPickerStyles";

export interface CalendarPickerProps {
  children?: React.ReactNode;
  value?: moment.Moment | null;
  onChange?: (date: any) => void;
  showPicker: boolean;
  onSaveCallback?: () => void;
  inline?: boolean;
  showSaveButton?: boolean;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  children,
  value,
  onChange,
  showPicker,
  onSaveCallback,
  inline = false,
  showSaveButton = true,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(moment(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const renderPicker = (): JSX.Element => (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateCalendar
        value={selectedDate}
        onChange={(newValue: Moment | null) => {
          setSelectedDate(newValue);
          if (onChange) {
            onChange(newValue ? newValue.toDate() : null);
          }
        }}
      />
      <TimePicker
        value={selectedDate}
        onChange={(newValue: Moment | null) => {
          setSelectedDate(newValue);
          if (onChange) {
            onChange(newValue);
          }
        }}
        sx={{
          "& .MuiPickersSectionList-root": {
            fontSize: 15,
          },
        }}
      />
      <If condition={showSaveButton}>
        <Button
          onClick={() => {
            if (onSaveCallback) {
              onSaveCallback();
            }
            onChange?.(selectedDate ? selectedDate.toDate() : null);
          }}
        >
          Save
        </Button>
      </If>
    </LocalizationProvider>
  );
  return (
    <Container>
      {!!children && children}
      <If condition={inline}>
        {renderPicker()}
        <Else>
          <Popper
            anchorEl={anchorEl}
            open={showPicker && !inline}
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
                    if (onSaveCallback) {
                      onSaveCallback();
                    }
                    onChange?.(value ? value.toDate() : null);
                  }}
                >
                  <CancelIcon />
                </CloseIconContainer>
                {renderPicker()}
              </Typography>
            </Paper>
          </Popper>
        </Else>
      </If>
    </Container>
  );
};

export default CalendarPicker;
