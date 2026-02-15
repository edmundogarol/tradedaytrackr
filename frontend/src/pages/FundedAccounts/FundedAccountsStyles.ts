import { color } from "@styles/colors";

const styles = {
  addButton: {
    text: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
    } as React.CSSProperties,
    button: {
      display: "flex",
      alignItems: "center",
      color: "white",
      maxWidth: 170,
      marginLeft: "auto",
      border: "none",
      backgroundColor: color("SystemGreen"),
    } as React.CSSProperties,
  },
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
};

export default styles;
