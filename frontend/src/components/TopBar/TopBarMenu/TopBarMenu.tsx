import Dialog from "@components/Dialog/Dialog";
import { useConfirmLogout } from "@hooks/account/useConfirmLogoutProps";
import type { User } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import { Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import React from "react";
import { TopBarMenuContainer } from "../TopBarStyledComponents";

export interface TopBarMenuProps {
  user: User;
}

const TopBarMenu: React.FunctionComponent<TopBarMenuProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { openDialog, dialogProps } = useConfirmLogout();
  const navigation = useReactNavigation();

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const menuAvatarLetter = user.username
    ? user.username.charAt(0)
    : user.first_name
      ? user.first_name.charAt(0)
      : user.email.charAt(0);

  return (
    <TopBarMenuContainer>
      <Dialog {...dialogProps} />
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32, textTransform: "uppercase" }}>
            {menuAvatarLetter}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigation.navigate(PageEnum.AccountSettings);
          }}
        >
          <Avatar /> Account
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            navigation.navigate(PageEnum.AccountSettings);
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => openDialog()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </TopBarMenuContainer>
  );
};

export default TopBarMenu;
