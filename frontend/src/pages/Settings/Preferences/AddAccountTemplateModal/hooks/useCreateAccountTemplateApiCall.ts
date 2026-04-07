import type { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import useAxiosFetch from "@hooks/useAxiosFetch";

interface CreateAccountTemplateSubmitApiCallData {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

interface CreateAccountTemplateSubmitApiCallErrors {
  errors: {
    [key: string]: string;
  };
}

const useCreateAccountTemplateApiCall = (): AxiosFetchWrapperResponse<
  CreateAccountTemplateSubmitApiCallData,
  CreateAccountTemplateSubmitApiCallErrors
> => {
  const { fetch, data, loading, error } = useAxiosFetch<
    CreateAccountTemplateSubmitApiCallData,
    CreateAccountTemplateSubmitApiCallErrors
  >(`trading-account-templates/`, {
    method: "POST",
  });

  return { fetch, data, loading, error };
};

export default useCreateAccountTemplateApiCall;
