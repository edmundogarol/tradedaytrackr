import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import React from "react";
import {
  Container,
  CurrentCharCount,
  Error,
  ErrorContainer,
  IconContainer,
  InputContainer,
  InputStyled,
  InputLabel as Label,
  ListContainer,
  ListItem,
  MaxChar,
  Subtext,
} from "./InputStyledComponents";

export interface InputWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactElement;
  error?: string;
  subtext?: string;
  suggestions?: { description: string }[];
  onSuggestionClick?: (suggestion: string) => void;
  inputContainerStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  onEnterPress?: (value: string) => void;
  maxInputLength?: number;
  darkMode?: boolean;
  positiveOnly?: boolean;
}

const Input: React.FC<InputWrapperProps> = ({
  label,
  disabled,
  icon,
  placeholder,
  error,
  subtext,
  containerStyle,
  inputContainerStyle,
  suggestions = [],
  onSuggestionClick,
  onEnterPress,
  value,
  maxInputLength,
  darkMode,
  positiveOnly,
  onFocus,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  const [arrowIndex, setArrowIndex] = React.useState(-1);

  const inputValue = String(value ?? "").toLowerCase();

  const filteredSuggestions = React.useMemo(() => {
    return suggestions.filter((s) =>
      s.description.toLowerCase().includes(inputValue),
    );
  }, [suggestions, inputValue]);

  const selectSuggestion = (suggestion: string): void => {
    onSuggestionClick?.(suggestion);
    setFocused(false);
    setArrowIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!filteredSuggestions.length) {
      if (
        e.key === "Enter" &&
        !!onEnterPress &&
        inputValue.trim() !== "" &&
        (!maxInputLength || inputValue.length <= maxInputLength)
      ) {
        e.preventDefault();
        onEnterPress(e.currentTarget.value);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setArrowIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setArrowIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case "Enter":
        console.log({ arrowIndex });
        if (arrowIndex >= 0) {
          e.preventDefault();
          selectSuggestion(filteredSuggestions[arrowIndex].description);
        }
        break;

      default:
        setArrowIndex(-1);
    }
  };

  return (
    <Container style={containerStyle}>
      <If condition={!!label}>
        <Label $disabled={disabled} $error={!!error}>
          {label}
        </Label>
      </If>

      <InputContainer
        $error={!!error}
        style={inputContainerStyle}
        $darkMode={darkMode}
      >
        <If condition={!!icon}>
          <IconContainer>{icon}</IconContainer>
        </If>

        <InputStyled
          {...props}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={(e) => {
            onFocus?.(e);
            setFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => setFocused(false), 100);
          }}
          onKeyDown={handleKeyDown}
          $placeholderTextColor={
            error ? color("SystemError2") : color("SystemLabel1")
          }
          $darkMode={darkMode}
          onChange={(e) => {
            if (positiveOnly && Number(e.target.value) < 0) {
              return;
            }
            props.onChange?.(e);
          }}
        />
        {maxInputLength && (
          <MaxChar>
            <CurrentCharCount
              $exceeded={String(value ?? "").length > maxInputLength}
            >{`${String(value ?? "").length}/${maxInputLength}`}</CurrentCharCount>
          </MaxChar>
        )}
      </InputContainer>

      <If condition={focused && filteredSuggestions.length > 0}>
        <ListContainer style={{ background: "white" }}>
          <ListItem $disabled>{"Recently used"}</ListItem>
          {filteredSuggestions.map((suggestion, idx) => (
            <ListItem
              key={suggestion.description}
              $selected={idx === arrowIndex}
              onMouseDown={() => selectSuggestion(suggestion.description)}
            >
              {suggestion.description}
            </ListItem>
          ))}
        </ListContainer>
      </If>

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
