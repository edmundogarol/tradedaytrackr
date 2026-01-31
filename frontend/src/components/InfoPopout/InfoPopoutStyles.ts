const styles = {
  paperStyle: {
    pointerEvents: "none",
    zIndex: 1500,
  } as React.CSSProperties,
  contentStyle: {
    p: 1.5,
    fontSize: 13,
    zIndex: 0,
  } as React.CSSProperties,
  infoIconStyle: {
    height: 16,
    width: 16,
    marginLeft: 5,
    color: "rgb(180 180 180 / 74%)",
    marginTop: "auto",
    marginBottom: "auto",
    cursor: "pointer",
    pointerEvents: "auto",
  } as React.CSSProperties,
  infoIconContainer: {
    display: "inline-flex",
  } as React.CSSProperties,
};

export default styles;
