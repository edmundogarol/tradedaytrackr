import { color } from "@styles/colors";

const styles = {
  addTradingDayButton: {
    display: "flex",
    alignItems: "center",
    color: "white",
    border: "none",
    backgroundColor: color("SystemBlue5"),
  } as React.CSSProperties,
  submitButton: {
    marginLeft: "auto",
  } as React.CSSProperties,
  greenButton: {
    backgroundColor: color("SystemGreen"),
  } as React.CSSProperties,
  dontLinkButton: {
    backgroundColor: color("SystemRed"),
  },
};

export default styles;
