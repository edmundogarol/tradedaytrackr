import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useRenderDrawerItems from "./hooks/useRenderDrawerItems";
import SideDrawerWrapper from "./SideDrawerWrapper";
import { DrawerHeader } from "./SideDrawerStyledComponents";
import { useGetDrawerItems } from "./hooks/useGetDrawerItems";

const SideDrawer: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const drawerItems = useGetDrawerItems();

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const renderDrawerItems = useRenderDrawerItems({
    open,
    drawerItems,
    openDrawer: handleDrawerOpen,
    closeDrawer: handleDrawerClose,
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideDrawerWrapper variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={
              !open
                ? (): void => handleDrawerOpen()
                : (): void => handleDrawerClose()
            }
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderDrawerItems()}</List>
        <Divider />
      </SideDrawerWrapper>
    </Box>
  );
};

export default SideDrawer;
