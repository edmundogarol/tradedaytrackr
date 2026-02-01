import { color } from "@styles/colors";

const styles = {
  progressBar: {
    height: 8,
    width: "100%",
  } as React.CSSProperties,
  addButton: {
    text: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    button: {
      display: "flex",
      alignItems: "center",
      color: "white",
      maxWidth: 170,
      marginLeft: "auto",
      border: "none",
      backgroundColor: color("SystemBlue5"),
    },
  },
};

export default styles;
