import styles from "@components/Stats/StatsSummary/StatsSummaryStyles";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface UseRenderDrawerItemsProps {
  drawerItems: {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
}

const useRenderDrawerItems = ({ drawerItems }: UseRenderDrawerItemsProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (): React.ReactElement => (
    <List>
      {drawerItems.map(({ text, icon, onClick }, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: "block" }}
          onMouseEnter={(e) => {
            setAnchorEl(e.currentTarget);
            setActiveIndex(index);
          }}
          onMouseLeave={() => {
            setAnchorEl(null);
            setActiveIndex(null);
          }}
        >
          <ListItemButton
            onClick={onClick}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                {
                  mr: "auto",
                },
              ]}
            >
              <Popper
                anchorEl={anchorEl}
                open={activeIndex === index}
                placement="right-start"
                sx={{ zIndex: 1500 }}
              >
                <Paper style={styles.paperStyle}>
                  <Typography sx={styles.contentStyle}>{text}</Typography>
                </Paper>
              </Popper>

              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={[
                {
                  opacity: 0,
                  marginLeft: 1,
                },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default useRenderDrawerItems;
