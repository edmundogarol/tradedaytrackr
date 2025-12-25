import { PageEnum, WebNavigation } from "@interfaces/NavigationTypes";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";

export interface RouterLocation {
  pathname: string;
  search: string;
  hash: string;
}

const useReactNavigation = (): WebNavigation => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return {
    navigate: (page: PageEnum, params?: { [key: string]: any }): void => {
      const options: any = {
        pathname: `../${page}`,
      };
      if (params) {
        options.search = createSearchParams(params).toString();
      }
      navigate(options);
    },
    replace: (page: PageEnum): void => {
      navigate(`../${page}`, { replace: true });
    },
    goBack: (): void => {
      navigate(-1);
    },
    getSearchParams: (): URLSearchParams => {
      return searchParams;
    },
    getCurrentPageName: (): PageEnum | null => {
      const parts = location.pathname.split("/");
      if (!parts.length) {
        return null;
      }
      return parts[parts.length - 1] as PageEnum;
    },
    createSearch(params: { [key: string]: any }): string {
      return createSearchParams(params).toString();
    },
  };
};

export default useReactNavigation;
