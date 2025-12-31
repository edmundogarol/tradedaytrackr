import { css } from "styled-components";

export const imageSrc = (imageName: string): string => {
  return `/images/${imageName}`;
};

export const isNotEmptyString = (value: string): boolean => {
  return typeof value === "string" && !!value && value !== "";
};

export const debugBorder = (color: string): ReturnType<typeof css> => {
  return css`
    border-color: ${color};
    border-width: 2px;
  `;
};

export const debugStylesBorder = (
  color: string
): { borderColor: string; borderWidth: number } => {
  return {
    borderColor: color,
    borderWidth: 1,
  };
};

export const isJson = (item: any): boolean => {
  let value = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    value = JSON.parse(value);
  } catch {
    return false;
  }

  return typeof value === "object" && value !== null;
};

export const delay = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));
