import React from "react";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import {
  InputError,
  ErrorContainer,
} from "@components/Input/InputStyledComponents";

export interface FormErrorProps {
  error?: string;
}

const FormError: React.FunctionComponent<FormErrorProps> = ({ error }) => {
  return (
    <If condition={!!error}>
      <ErrorContainer>
        <Icon
          style={{ color: color("SystemError2") }}
          name={"error"}
          type={IconTypeEnum.MaterialIcons}
        />
        <InputError>{error}</InputError>
      </ErrorContainer>
    </If>
  );
};
export default FormError;
