import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { HorizontalSection } from "@styles/globalStyledComponents";
import type { Moment } from "moment";
import moment from "moment";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import styles from "./DateFilterStyles";

export type RangeType = "today" | "week" | "month" | "custom";

interface DateFilterProps {
  selectedRangeType?: RangeType;
  onDateChange?: (
    start: Moment | null,
    end: Moment | null,
    rangeType: RangeType,
  ) => void;
}

const DateFilter = ({
  selectedRangeType = "week",
  onDateChange,
}: DateFilterProps): JSX.Element => {
  const [rangeType, setRangeType] = useState<RangeType>(selectedRangeType);
  const [start, setStart] = useState<Moment | null>(null);
  const [end, setEnd] = useState<Moment | null>(null);

  useEffect(() => {
    setRangeType(selectedRangeType);
  }, [selectedRangeType]);

  useEffect(() => {
    if (rangeType === "today") {
      setStart(moment().startOf("day").subtract(1, "day"));
      setEnd(moment());
    }

    if (rangeType === "week") {
      setStart(moment().startOf("day").subtract(7, "day"));
      setEnd(moment());
    }

    if (rangeType === "month") {
      setStart(moment().startOf("day").subtract(30, "day"));
      setEnd(moment());
    }

    if (rangeType === "custom") {
      setStart(null);
      setEnd(null);
    }
  }, [rangeType]);

  useEffect(() => {
    if (!onDateChange) return;

    if (start && end && start.isAfter(end)) return;

    onDateChange(start, end, rangeType);
  }, [start, end, rangeType, onDateChange]);

  const handlePreset = (type: RangeType): void => {
    setRangeType(type);
  };

  return (
    <HorizontalSection>
      <Button
        sx={rangeType === "today" ? styles.buttonSelected : styles.button}
        onClick={() => handlePreset("today")}
      >
        Today
      </Button>

      <Button
        sx={rangeType === "week" ? styles.buttonSelected : styles.button}
        onClick={() => handlePreset("week")}
      >
        This Week
      </Button>

      <Button
        sx={rangeType === "month" ? styles.buttonSelected : styles.button}
        onClick={() => handlePreset("month")}
      >
        This Month
      </Button>

      <Button
        sx={rangeType === "custom" ? styles.buttonSelected : styles.button}
        onClick={() => {
          if (rangeType === "custom") {
            setStart(null);
            setEnd(null);
            handlePreset("week");
            return;
          }
          handlePreset("custom");
        }}
      >
        Custom
      </Button>

      {rangeType === "custom" && (
        <>
          <DatePicker
            slotProps={styles.input}
            label="Start"
            value={start}
            onChange={(newValue) => setStart(newValue)}
          />
          <DatePicker
            slotProps={styles.input}
            label="End"
            value={end}
            minDate={start || undefined} // ✅ prevents invalid range
            onChange={(newValue) => setEnd(newValue)}
          />
        </>
      )}
    </HorizontalSection>
  );
};

export default DateFilter;
