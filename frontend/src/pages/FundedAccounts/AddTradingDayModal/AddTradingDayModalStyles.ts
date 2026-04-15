import { color } from "@styles/colors";

const styles = {
  addTradingDayButton: {
    display: "flex",
    alignItems: "center",
    color: "white",
    border: "none",
  } as React.CSSProperties,
  greenButton: {
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
  } as React.CSSProperties,
  payoutReadyButton: {
    backgroundColor: color("SystemRed"),
  },
};

export default styles;
