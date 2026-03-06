import { color } from "@styles/colors";

const styles = {
  editIcon: {
    height: 15,
    width: 15,
    cursor: "pointer",
    pointerEvents: "auto",
    marginLeft: 5,
  } as React.CSSProperties,
  subtitleEditIcon: {
    height: 12,
    width: 12,
    cursor: "pointer",
    pointerEvents: "auto",
    marginLeft: 5,
  } as React.CSSProperties,
  saveButton: {
    pointerEvents: "auto",
    flex: 1,
    height: 30,
    marginLeft: 10,
    display: "flex",
    border: "none",
  } as React.CSSProperties,
  inputStyle: {
    background: "rgb(255 255 255 / 9%)",
    color: color("SystemTitleWhite"),
    fontSize: 16,
    width: 200,
    pointerEvents: "auto",
  } as React.CSSProperties,
  inputContainerStyle: {
    background: "transparent",
    height: 30,
  } as React.CSSProperties,
  containerStyle: {
    flex: 6,
  } as React.CSSProperties,
};

export default styles;
