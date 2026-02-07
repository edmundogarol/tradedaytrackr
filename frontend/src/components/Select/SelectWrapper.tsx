import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { If } from "@components/If/If";
import {
  Label,
  Select,
  SelectContainer,
} from "./SelectWrapperStyledComponents";
import styles from "./SelectWrapperStyles";

interface SelectWrapperProps {
  items?: string[];
  label?: string;
}

const SelectWrapper: React.FunctionComponent<SelectWrapperProps> = ({
  items,
  label,
}) => {
  return (
    <>
      <If condition={!!label}>
        <Label>{label}</Label>
      </If>
      <SelectContainer>
        <Select>
          {items?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <ExpandMoreIcon style={styles.showMoreIcon} />
      </SelectContainer>
    </>
  );
};

export default SelectWrapper;
