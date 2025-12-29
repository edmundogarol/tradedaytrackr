export type ColorKey =
  | "SystemBlue1"
  | "SystemBlue2"
  | "SystemBlue3"
  | "SystemBlue4"
  | "SystemBorder"
  | "SystemLabel1"
  | "SystemLabel2"
  | "SystemBackground"
  | "SystemBackground1"
  | "SystemGrey1"
  | "SystemError1"
  | "SystemError2"
  | "SystemSuccess1"
  | "SystemSuccess2"
  | "SystemLabel3"
  | "SystemTeal"
  | "SystemPurple"
  | "SystemWhite";

const colorsMap = {
  SystemBlue1: "#1a2241",
  SystemBlue2: "#2e4365",
  SystemBlue3: "#658fb5",
  SystemBlue4: "#b7d3e8",
  SystemBorder: "#aaaaaa",
  SystemLabel1: "#adadad",
  SystemLabel2: "#323232",
  SystemLabel3: "#737373",
  SystemBackground: "#121822",
  SystemBackground1: "#f2f2f2",
  SystemGrey1: "#cecece",
  SystemError1: "#ff3c3c",
  SystemError2: "#ff7575",
  SystemSuccess1: "#7dc770",
  SystemSuccess2: "#5e9f53",
  SystemTeal: "#66d3bf",
  SystemPurple: "#b27cdc",
  SystemWhite: "#ffffff",
};

export const color = (colorKey: ColorKey): string => {
  return colorsMap[colorKey];
};
