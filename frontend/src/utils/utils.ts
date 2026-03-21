import { css } from "styled-components";

export const imageSrc = (imageName: string): string => {
  return `/images/${imageName}`;
};

export const firmLogoSrc = (firmName: string): string => {
  return `firms/${firmName}.png`;
};

export const devSrc = (imageName: string): string => {
  return `/dev/${imageName}`;
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
  color: string,
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

export const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const sanitizeTag = (input: string): string => {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "") // remove quotes
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/-+/g, "") // collapse multiple dashes
    .replace(/^-|-$/g, ""); // trim dashes from ends
};
