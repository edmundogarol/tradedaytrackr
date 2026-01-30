export const iconStyle = (size: number): React.CSSProperties => ({
  height: size,
  width: size,
  color: "#48577349",
  position: "absolute",
  zIndex: 0,
});

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
  iconStyle: (size: number): React.CSSProperties => ({
    height: size,
    width: size,
    color: "#48577349",
    position: "absolute",
    zIndex: 0,
  }),
  featureIconStyle: (size: number, color?: string): React.CSSProperties => ({
    height: size,
    width: size,
    color: color || "#ffffff17",
    zIndex: 0,
    marginRight: 5,
  }),
};

export default styles;
