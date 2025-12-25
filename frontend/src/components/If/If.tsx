import React from "react";

interface IfProps {
  condition?: boolean;
  children?: React.ReactNode;
}

export const ElseIf: React.FunctionComponent<IfProps> = ({
  children,
}): React.ReactElement => {
  return <>{children}</>;
};

export const Else: React.FunctionComponent<IfProps> = ({
  children,
}): React.ReactElement => {
  return <>{children}</>;
};

export const If: React.FunctionComponent<IfProps> = ({
  children,
  condition,
}): React.ReactElement | null => {
  const block: React.ReactElement[] = [];
  let ifConditionMet = false;
  let elseIfConditionMet = false;

  try {
    if (children) {
      React.Children.forEach(children, (child) => {
        if (
          React.isValidElement(child) &&
          condition &&
          child.type !== ElseIf &&
          child.type !== Else
        ) {
          ifConditionMet = true;
          block.push(child);
        }
        if (
          React.isValidElement(child) &&
          !ifConditionMet &&
          child.type === ElseIf &&
          (child as React.ReactElement<IfProps>).props.condition
        ) {
          elseIfConditionMet = true;
          block.push(child);
        }
        if (
          React.isValidElement(child) &&
          child.type === Else &&
          !elseIfConditionMet &&
          !ifConditionMet
        ) {
          block.push(child);
        }
      });
    }
    return <>{block.map((child) => child)}</>;
  } catch (error) {
    console.log("If component error: ", error);
    return null;
  }
};
