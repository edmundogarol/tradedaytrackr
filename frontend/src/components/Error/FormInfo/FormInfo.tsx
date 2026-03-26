import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import React from "react";
import { FormInfoContainer, FormInfoDetail } from "./FormInfoStyledComponents";

export interface FormInfoProps {
  detail?: string | React.ReactNode;
}

const FormInfo: React.FunctionComponent<FormInfoProps> = ({ detail }) => {
  return (
    <If condition={!!detail}>
      <FormInfoContainer>
        <Icon
          style={{ color: color("SystemBlue3") }}
          name={"info"}
          type={IconTypeEnum.MaterialIcons}
        />
        <FormInfoDetail>{detail}</FormInfoDetail>
      </FormInfoContainer>
    </If>
  );
};
export default FormInfo;
