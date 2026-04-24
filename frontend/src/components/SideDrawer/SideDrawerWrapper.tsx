import MuiDrawer from "@mui/material/Drawer";
import type { CSSObject, Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { color } from "@styles/colors";

export const drawerWidth = 200;
export const closedDrawerWidth = 64;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: `linear-gradient(
    0deg,
    ${color("SystemBackground")} 35%,
    ${color("SystemBackground2")} 100%
  )`,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${closedDrawerWidth}px + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${closedDrawerWidth}px + 1px)`,
  },
  background: `linear-gradient(
    0deg,
    ${color("SystemBackground")} 35%,
    ${color("SystemBackground2")} 100%
  )`,
});

const SideDrawerWrapper = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }: { open?: boolean }): boolean => open ?? false,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }: { open?: boolean }): boolean => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default SideDrawerWrapper;
