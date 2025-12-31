import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
}

const useRenderDrawerItems = ({
  open,
  drawerItems,
}: UseRenderDrawerItemsProps) => {
  return (): React.ReactElement => (
    <List>
      {drawerItems.map(({ text, icon, onClick }, index) => (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => console.log({ onClick })}
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
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
