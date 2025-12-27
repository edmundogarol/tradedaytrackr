import React from "react";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import {
  Label,
  InputContainer,
  InputStyled,
  InputError,
  ErrorContainer,
  InputWrapper,
  Subtext,
} from "./InputStyledComponents";

export interface InputWrapperProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  error?: string;
  subtext?: string;
  googleAutoComplete?: boolean;
  onGoogleAutoCompleteChange?: (
    data: {
      description: string;
      place_id: string;
      structured_formatting: { main_text: string };
    },
    details: any
  ) => void;
  debounce?: number;
  updateCallback?: (text: string) => void;
}

const Input: React.FunctionComponent<InputWrapperProps> = ({
  label,
  disabled,
  icon,
  placeholder,
  error,
  subtext,
  ...props
}) => {
  return (
    <InputWrapper>
      <If condition={!!label}>
        <Label $disabled={disabled} $error={!!error}>
          {label}
        </Label>
      </If>
      <InputContainer $error={!!error}>
        <If condition={!!icon}>{icon}</If>
        <InputStyled
          {...props}
          disabled={disabled}
          placeholder={placeholder}
          $placeholderTextColor={
            error ? color("SystemError2") : color("SystemLabel1")
          }
          aria-disabled={!disabled}
        />
      </InputContainer>
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
      <If condition={!!subtext}>
        <Subtext>{subtext}</Subtext>
      </If>
    </InputWrapper>
  );
};
export default Input;
