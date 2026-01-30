import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import useRenderDrawerItems from "./hooks/useRenderDrawerItems";
import SideDrawerWrapper from "./SideDrawerWrapper";
import { useGetDrawerItems } from "./hooks/useGetDrawerItems";

const SideDrawer: React.FunctionComponent = () => {
  const drawerItems = useGetDrawerItems();

  const renderDrawerItems = useRenderDrawerItems({
    drawerItems,
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideDrawerWrapper variant="permanent">
        <Divider />
        <List>{renderDrawerItems()}</List>
        <Divider />
      </SideDrawerWrapper>
    </Box>
  );
};

export default SideDrawer;
