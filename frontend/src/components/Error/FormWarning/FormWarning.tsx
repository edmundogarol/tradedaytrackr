import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import React from "react";
import {
  FormWarningContainer,
  FormWarningDetail,
} from "./FormWarningStyledComponents";

export interface FormWarningProps {
  detail?: string;
}

const FormWarning: React.FunctionComponent<FormWarningProps> = ({ detail }) => {
  return (
    <If condition={!!detail}>
      <FormWarningContainer>
        <Icon
          style={{ color: color("SystemWarning") }}
          name={"info"}
          type={IconTypeEnum.MaterialIcons}
        />
        <FormWarningDetail>{detail}</FormWarningDetail>
      </FormWarningContainer>
    </If>
  );
};
export default FormWarning;
