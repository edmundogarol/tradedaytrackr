import Gap from "@components/Gap/Gap";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import React from "react";
import { BeatLoader } from "react-spinners";

export interface LoadingContentProps {
  loading?: boolean;
  size?: number;
  children?: React.ReactNode;
}

const LoadingContent: React.FunctionComponent<LoadingContentProps> = ({
  loading = true,
  size,
  children,
}) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <If condition={loading}>
        {children}
        <Gap level={2} />
        <BeatLoader
          color={color("SystemBackground1")}
          loading={loading}
          size={size || 150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </If>
    </div>
  );
};

export default LoadingContent;
