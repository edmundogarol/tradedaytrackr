export type ColorKey =
  | "SystemBlue1"
  | "SystemBlue2"
  | "SystemBlue3"
  | "SystemBlue4"
  | "SystemBlue5"
  | "SystemGreen"
  | "SystemLightGreen"
  | "SystemBorder"
  | "SystemLabel1"
  | "SystemLabel2"
  | "SystemBackground"
  | "SystemBackground1"
  | "SystemBackground2"
  | "SystemBackgroundFundeds"
  | "SystemBackgroundFundeds2"
  | "SystemGrey1"
  | "SystemError1"
  | "SystemError2"
  | "SystemRed"
  | "SystemSuccess1"
  | "SystemSuccess2"
  | "SystemWarning"
  | "SystemLabel3"
  | "SystemTeal"
  | "SystemPurple"
  | "SystemWhite"
  | "SystemTitleWhite";

const colorsMap = {
  SystemBlue1: "#1a2241",
  SystemBlue2: "#2e4365",
  SystemBlue3: "#658fb5",
  SystemBlue4: "#b7d3e8",
  SystemBlue5: "#4a9fad",
  SystemGreen: "#80ae70",
  SystemLightGreen: "#b8f3b8",
  SystemBorder: "#aaaaaa",
  SystemLabel1: "#adadad",
  SystemLabel2: "#323232",
  SystemLabel3: "#737373",
  SystemBackground: "#121822",
  SystemBackground1: "#f2f2f2",
  SystemBackground2: "#304261",
  SystemBackgroundFundeds: "#122213",
  SystemBackgroundFundeds2: "#1b3b24",
  SystemGrey1: "#cecece",
  SystemError1: "#ff3c3c",
  SystemError2: "#ff7575",
  SystemRed: "#d56060",
  SystemSuccess1: "#7dc770",
  SystemSuccess2: "#5e9f53",
  SystemWarning: "#e5bd6f",
  SystemTeal: "#66d3bf",
  SystemPurple: "#b27cdc",
  SystemWhite: "#ffffff",
  SystemTitleWhite: "#d8d8d8",
};

export const color = (colorKey: ColorKey): string => {
  return colorsMap[colorKey];
};
