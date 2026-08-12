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
      maxWidth: 200,
      border: "none",
      backgroundColor: color("SystemGreen"),
    } as React.CSSProperties,
  },
  monthTile: {
    minWidth: 110,
    height: 130,
  } as React.CSSProperties,
  monthTileNet: {
    marginTop: 2,
    paddingTop: 3,
    borderTop: "1px solid rgba(255, 255, 255, 0.15)",
  } as React.CSSProperties,
  sectionIcon: {
    color: "white",
    marginRight: 5,
  } as React.CSSProperties,
  deleteIcon: {
    color: "#c0c0c0",
    cursor: "pointer",
    fontSize: 18,
  } as React.CSSProperties,
};

export default styles;
