import type { PageEnum } from "@interfaces/NavigationTypes";

export const linkToUrl = (page: PageEnum): string => {
  return `${page}`;
};
