import React from "react";
import { color } from "@styles/colors";
import { ClipLoader } from "react-spinners";

export interface LoadingProps {
  loading?: boolean;
}

const Loading: React.FunctionComponent<LoadingProps> = ({ loading = true }) => {
  return (
    <ClipLoader
      color={color("SystemBackground1")}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
