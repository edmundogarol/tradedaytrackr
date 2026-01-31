export const iconStyle = (size: number): React.CSSProperties => ({
  height: size,
  width: size,
  color: "#48577349",
  position: "absolute",
  zIndex: 0,
});

const styles = {
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
