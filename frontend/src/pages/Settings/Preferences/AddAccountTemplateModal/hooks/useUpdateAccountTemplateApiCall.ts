import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { AccountTemplate } from "@interfaces/CustomTypes";

interface UpdateAccountTemplateApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useUpdateAccountTemplateApiCall = (): AxiosFetchWrapperResponse<
  AccountTemplate,
  UpdateAccountTemplateApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    AccountTemplate,
    UpdateAccountTemplateApiCallErrors
  >(`trading-account-templates/`, {
    method: "PATCH",
  });

  return { fetch, data, loading, error };
};

export default useUpdateAccountTemplateApiCall;
