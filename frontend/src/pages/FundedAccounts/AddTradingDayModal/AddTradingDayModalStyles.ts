import { color } from "@styles/colors";

const styles = {
  addTradingDayButton: {
    display: "flex",
    alignItems: "center",
    color: "white",
    maxWidth: 200,
    border: "none",
    backgroundColor: color("SystemGreen"),
  } as React.CSSProperties,
  submitButton: {
    marginLeft: "auto",
  } as React.CSSProperties,
  payoutButton: {
    marginLeft: "auto",
    backgroundColor: color("SystemRed"),
  } as React.CSSProperties,
};

export default styles;
