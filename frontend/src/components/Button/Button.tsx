import React from "react";
import { type IconGlyph, IconTypeEnum } from "@components/Icon/IconInterfaces";
import Icon from "@components/Icon/Icon";
import {
  ButtonText,
  HuggingOutlinedPressableWrapper,
  OutlinedPressableWrapper,
  PressableWrapper,
} from "./ButtonStyledComponents";
import { ButtonType } from "./ButtonInterfaces";

export interface ButtonWrapperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tdtrButtonType?: ButtonType;
  text?: string | React.ReactElement;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  disabledBlock?: boolean;
  textStyle?: React.CSSProperties | React.CSSProperties[];
  iconStyle?: React.CSSProperties | React.CSSProperties[];
  iconType?: IconTypeEnum;
  iconLeft?: IconGlyph;
  iconRight?: IconGlyph;
  transparent?: boolean;
}

const Button: React.FunctionComponent<ButtonWrapperProps> = ({
  tdtrButtonType = ButtonType.Block,
  text,
  textStyle,
  iconLeft,
  iconRight,
  iconStyle,
  style,
  disabledBlock,
  transparent,
  loading,
  iconType = IconTypeEnum.FontAwesome,
  onClick,
  ...props
}): React.ReactElement => {
  let ButtonStyled = PressableWrapper;
  if (tdtrButtonType === ButtonType.Outline) {
    ButtonStyled = OutlinedPressableWrapper;
  } else if (tdtrButtonType === ButtonType.HuggingOutline) {
    ButtonStyled = HuggingOutlinedPressableWrapper;
  }

  return (
    <ButtonStyled
      $loading={loading}
      {...props}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (onClick) onClick(e);
      }}
      $disabledBlock={disabledBlock as boolean}
      $transparent={transparent as boolean}
      style={style}
    >
      {iconLeft ? (
        <Icon
          style={iconStyle as React.CSSProperties | React.CSSProperties[]}
          name={iconLeft as IconGlyph}
          type={iconType as IconTypeEnum}
        />
      ) : null}
      <ButtonText
        $buttonType={tdtrButtonType}
        style={
          Array.isArray(textStyle) ? Object.assign({}, ...textStyle) : textStyle
        }
      >
        {text}
      </ButtonText>
      {iconRight ? (
        <Icon style={iconStyle} name={iconRight} type={iconType} />
      ) : null}
    </ButtonStyled>
  );
};

export default Button;
