import React from "react";
import Icon from "@components/Icon/Icon";
import type { IconGlyph, IconTypeEnum } from "@components/Icon/IconInterfaces";
import { color } from "@styles/colors";

const useRenderInputIcon = (): ((
  inputName: IconGlyph,
  inputType: IconTypeEnum,
  error: boolean,
  onClick?: () => void
) => React.ReactElement) => {
  return (
    inputName: IconGlyph,
    inputType: IconTypeEnum,
    error: boolean,
    onClick?: () => void
  ) => (
    <div onClick={onClick}>
      <Icon
        name={inputName}
        type={inputType}
        style={{
          ...{
            color: error ? color("SystemError2") : color("SystemLabel1"),
          },
        }}
      />
    </div>
  );
};

export default useRenderInputIcon;
