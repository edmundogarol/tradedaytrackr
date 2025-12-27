import React from "react";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import {
  FormSuccessContainer,
  FormSuccessDetail,
} from "./FormSuccessStyledComponents";

export interface FormSuccessProps {
  detail?: string;
}

const FormSuccess: React.FunctionComponent<FormSuccessProps> = ({ detail }) => {
  return (
    <If condition={!!detail}>
      <FormSuccessContainer>
        <Icon
          style={{ color: color("SystemSuccess1") }}
          name={"info"}
          type={IconTypeEnum.MaterialIcons}
        />
        <FormSuccessDetail>{detail}</FormSuccessDetail>
      </FormSuccessContainer>
    </If>
  );
};
export default FormSuccess;
