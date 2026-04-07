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
  return (
    typeof value === "string" &&
    !!value &&
    value !== "" &&
    value.replaceAll(" ", "") !== ""
  );
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

export const appendIfDefined = (
  formData: FormData,
  key: string,
  value: any,
): void => {
  if (value !== undefined && value !== null) {
    formData.append(key, String(value));
  }
};

function toCamel(s: string): string {
  return s.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function keysToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(keysToCamel);
  }

  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toCamel(key)] = keysToCamel(obj[key]);
      return acc;
    }, {} as any);
  }

  return obj;
}

function toSnake(s: string): string {
  return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function keysToSnake(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(keysToSnake);
  }

  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toSnake(key)] = keysToSnake(obj[key]);
      return acc;
    }, {} as any);
  }

  return obj;
}

export function resizeImage(file: File, maxSize = 250): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = (): void => {
      let { width, height } = img;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          }
        },
        "image/jpeg",
        0.7,
      );
    };

    img.src = URL.createObjectURL(file);
  });
}
