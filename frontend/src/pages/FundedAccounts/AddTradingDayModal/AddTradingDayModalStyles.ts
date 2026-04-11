import { color } from "@styles/colors";

const styles = {
  addTradingDayButton: {
    display: "flex",
    alignItems: "center",
    color: "white",
    border: "none",
    backgroundColor: color("SystemGreen"),
  } as React.CSSProperties,
  dontLinkButton: {
    backgroundColor: color("SystemRed"),
  },
  submitButton: {
    marginLeft: "auto",
  } as React.CSSProperties,
  payoutButton: {
    marginLeft: "auto",
    backgroundColor: color("SystemRed"),
  } as React.CSSProperties,
};

export default styles;
