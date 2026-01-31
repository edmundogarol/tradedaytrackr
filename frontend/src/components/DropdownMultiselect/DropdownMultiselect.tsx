import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import GlassTile from "@components/GlassTile/GlassTile";
import { ExpandMore } from "@mui/icons-material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  BoxContainer,
  CollapseStyled,
  DropdownContainer,
  ListContainer,
  TitleContainer,
  TitleText,
} from "./DropdownMultiselectStyledComponents";
import styles from "./DropdownMultiselectStyles";

export interface DropdownProps {
  items: string[];
  title: string;
}

const DropdownMultiselect: React.FunctionComponent<DropdownProps> = ({
  items,
  title,
}) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const [checked, setChecked] = React.useState<string[]>([]);

  const handleToggle = (value: string) => (): void => {
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setCollapsed(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return (): void => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <ClickAwayListener onClickAway={() => setCollapsed(true)}>
      <DropdownContainer>
        <Button
          onClick={() => setCollapsed((prev) => !prev)}
          style={styles.button}
        >
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
    </ClickAwayListener>
  );
};

export default DropdownMultiselect;
