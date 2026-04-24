import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import useSettingsDispatch from "@pages/Settings/hooks/useSettingsDispatch";
import useSettingsState from "@pages/Settings/hooks/useSettingsState";
import { color } from "@styles/colors";
import * as React from "react";
import { useGetDrawerItems } from "./hooks/useGetDrawerItems";
import useRenderDrawerItems from "./hooks/useRenderDrawerItems";
import SideDrawerWrapper from "./SideDrawerWrapper";

const SideDrawer: React.FunctionComponent = () => {
  const drawerItems = useGetDrawerItems();
  const { drawerOpen } = useSettingsState();
  const { updateDrawerOpen } = useSettingsDispatch();
  const renderDrawerItems = useRenderDrawerItems({
    drawerItems,
  });

  const handleDrawerOpen = (): void => {
    updateDrawerOpen(true);
  };
  const handleDrawerClose = (): void => {
    updateDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideDrawerWrapper variant="permanent" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={[
              {
                color: color("SystemLabel1"),
                marginRight: 5,
              },
            ]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>{renderDrawerItems()}</List>
        <Divider />
      </SideDrawerWrapper>
    </Box>
  );
};

export default SideDrawer;
