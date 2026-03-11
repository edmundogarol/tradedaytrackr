import { color } from "@styles/colors";

const styles = {
  editIcon: {
    height: 15,
    width: 15,
    cursor: "pointer",
    pointerEvents: "auto",
    marginLeft: 5,
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
      border: "none",
      backgroundColor: color("SystemGreen"),
    },
  },
};

export default styles;
