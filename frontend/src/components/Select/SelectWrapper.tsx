import { If } from "@components/If/If";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import {
  Label,
  Select,
  SelectContainer,
} from "./SelectWrapperStyledComponents";
import styles from "./SelectWrapperStyles";

interface SelectWrapperProps {
  items: { name: string; value: string | number }[];
  label?: string;
  style?: React.CSSProperties;
  onSelect?: (selected: string) => void;
  defaultValue?: string;
  selectedValue?: string | number;
  disabled?: boolean;
}

const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  items,
  label,
  style,
  onSelect,
  defaultValue,
  selectedValue,
  disabled,
}) => {
  return (
    <>
      <If condition={!!label}>
        <Label>{label}</Label>
      </If>
      <SelectContainer style={style}>
        <Select
          disabled={disabled}
          value={selectedValue}
          onChange={(e) => onSelect && onSelect(e.target.value)}
          defaultValue={defaultValue}
        >
          {items?.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </Select>
        <If condition={!disabled}>
          <ExpandMoreIcon style={styles.showMoreIcon} />
        </If>
      </SelectContainer>
    </>
  );
};

export default SelectWrapper;
