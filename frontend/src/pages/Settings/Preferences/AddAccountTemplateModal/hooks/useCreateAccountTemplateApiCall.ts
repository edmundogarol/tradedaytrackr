import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";
import type { AccountTemplate } from "@interfaces/CustomTypes";

interface CreateAccountTemplateSubmitApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useCreateAccountTemplateApiCall = (): AxiosFetchWrapperResponse<
  AccountTemplate,
  CreateAccountTemplateSubmitApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    AccountTemplate,
    CreateAccountTemplateSubmitApiCallErrors
  >(`trading-account-templates/`, {
    method: "POST",
  });

  return { fetch, data, loading, error };
};

export default useCreateAccountTemplateApiCall;
