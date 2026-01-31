import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import GlassTile from "@components/GlassTile/GlassTile";
import { ExpandMore } from "@mui/icons-material";
import {
  BoxContainer,
  CollapseStyled,
  DropdownContainer,
  ListContainer,
  TitleContainer,
  TitleText,
} from "./DropdownStyledComponents";
import styles from "./DropdownStyles";

export interface DropdownProps {
  items: string[];
  title: string;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({ items, title }) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const [checked, setChecked] = React.useState<string[]>([]);

  const handleToggle = (value: string) => (): void => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <DropdownContainer onBlur={() => setCollapsed(true)}>
      <Button onClick={() => setCollapsed(!collapsed)} style={styles.button}>
        <GlassTile positive featureTile minHeight={20} noGlow>
          <TitleContainer>
            <TitleText>{title}</TitleText>
            <ExpandMore style={styles.expandMoreIcon} />
          </TitleContainer>
        </GlassTile>
      </Button>
      <CollapseStyled in={!collapsed}>
        <ListContainer>
          <BoxContainer>
            <List sx={styles.list}>
              {items.map((value) => {
                return (
                  <ListItem key={value} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          style={styles.checkbox}
                          checked={checked.includes(value)}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText id={value} primary={value} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </BoxContainer>
        </ListContainer>
      </CollapseStyled>
    </DropdownContainer>
  );
};

export default Dropdown;
