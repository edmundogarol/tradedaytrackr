import { PageEnum } from "@interfaces/NavigationTypes";

export const linkToUrl = (page: PageEnum) => {
  return `/${page}`;
};
