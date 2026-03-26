import { color } from "@styles/colors";
import React from "react";
import { ClipLoader } from "react-spinners";

export interface LoadingProps {
  loading?: boolean;
  size?: number;
}

const Loading: React.FunctionComponent<LoadingProps> = ({
  loading = true,
  size,
}) => {
  return (
    <ClipLoader
      color={color("SystemBackground1")}
      loading={loading}
      size={size || 150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
