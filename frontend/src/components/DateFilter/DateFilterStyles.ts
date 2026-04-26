import { color } from "@styles/colors";

const styles = {
  button: {
    color: color("SystemLabel1"),
    fontSize: 10,
  } as React.CSSProperties,
  buttonSelected: {
    color: color("SystemLabel1"),
    fontSize: 10,
    backgroundColor: "#ffffff12",
  } as React.CSSProperties,
  input: {
    textField: {
      sx: {
        width: 150,
        "& .MuiFormLabel-root": {
          color: color("SystemLabel1"),
          fontSize: 12,
          height: 20,
          top: -7,
        },
        "& .MuiPickersSectionList-sectionContent": {
          color: color("SystemLabel1"),
          fontSize: 12,
          marginBottom: "14px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: color("SystemLabel1") },
        },
        "& .MuiPickersOutlinedInput-notchedOutline": {
          border: "1px solid " + color("SystemLabel1"),
        },
        "& .MuiPickersInputBase-root": {
          height: 35,
        },
        "& .MuiPickersInputBase-root:hover": {
          border: "1px solid " + color("SystemLabel1"),
        },
        "& .MuiPickersInputBase-sectionAfter": {
          color: color("SystemLabel1"),
        },
      },
    },
    openPickerButton: {
      sx: { color: color("SystemLabel1") },
    },
  },
};

export default styles;
