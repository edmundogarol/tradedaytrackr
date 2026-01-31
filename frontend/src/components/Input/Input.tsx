import React from "react";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import {
  InputLabel as Label,
  InputContainer,
  InputStyled,
  Error,
  ErrorContainer,
  Container,
  Subtext,
  IconContainer,
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
    <Container>
      <If condition={!!label}>
        <Label $disabled={disabled} $error={!!error}>
          {label}
        </Label>
      </If>
      <InputContainer $error={!!error}>
        <IconContainer>
          <If condition={!!icon}>{icon}</If>
        </IconContainer>
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
          <Error>{error}</Error>
        </ErrorContainer>
      </If>
      <If condition={!!subtext}>
        <Subtext>{subtext}</Subtext>
      </If>
    </Container>
  );
};
export default Input;
