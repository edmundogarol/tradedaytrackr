import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

interface UseRenderDrawerItemsProps {
  open: boolean;
  drawerItems: {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
  openDrawer: () => void;
  closeDrawer: () => void;
}

const useRenderDrawerItems = ({
  open,
  drawerItems,
  openDrawer,
  closeDrawer,
}: UseRenderDrawerItemsProps) => {
  return (): React.ReactElement => (
    <List>
      {drawerItems.map(({ text, icon, onClick }, index) => (
        <ListItem key={index} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => {
              if (!open) {
                openDrawer();
              } else {
                onClick();
                closeDrawer();
              }
            }}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
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
