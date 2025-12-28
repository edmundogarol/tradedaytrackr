import { useCallback, useState } from "react";
import type { AxiosError } from "axios";
import axios from "axios";
import environmentConfig from "@utils/environmentConfig";
import { isJson } from "@utils/utils";

export const APPLICATION_JSON = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export interface AxiosFetchWrapperResponse<T> {
  fetch: () => Promise<{ data: T | undefined; error: object | undefined }>;
  data: T | undefined;
  loading: boolean;
  error: object | undefined;
}

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const useAxiosFetch = <T>(
  url: string,
  params?: {
    data?: object;
    method?: string;
    contentType?: string;
    accept?: string;
    params?: { [key: string]: any };
  },
  useUrl?: string,
  skip?: boolean
): AxiosFetchWrapperResponse<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<object | undefined>(undefined);
  const baseUrl = (url: string) => `${environmentConfig.HOST}/api/${url}`;

  const fetch = useCallback(async () => {
    let fetchData;
    let fetchError;

    setLoading(true);
    if (skip) {
      setLoading(false);
      return { data: fetchData, error: fetchError };
    }

    try {
      const response = await axios({
        url: useUrl ? useUrl : baseUrl(url),
        headers: {
          Accept: APPLICATION_JSON,
          "X-CSRFToken": getCookie("csrftoken"),
        },
        ...params,
      });

      fetchData = response.data || response.config.data;
      if (fetchData) {
        console.debug("Ok!", response.config.url);
      } else if (response.status === 403) {
        console.debug("Login required");
      } else if (response.status === 503) {
        console.error("Timeout", response);
      } else {
        console.error("Bad request", response.status, url);
      }
      setData(fetchData);
    } catch (responseError) {
      const errors = responseError as Error | AxiosError;

      if (axios.isAxiosError(errors)) {
        if (isJson(errors.request?._response)) {
          setError(JSON.parse(errors.request?._response));
          fetchError = JSON.parse(errors.request?._response);
        } else {
          setError({ error: errors.request?._response });
          fetchError = { error: errors.request?._response };
        }
      } else {
        setError({ error: responseError as unknown as string });
        fetchError = { error: responseError as unknown as string };
      }
      console.log("Fetch error: ", fetchError, url);
    } finally {
      setLoading(false);
    }

    return { data: fetchData, error: fetchError };
  }, [url, params, skip, useUrl]);

  return {
    fetch,
    data,
    loading,
    error,
  };
};

export default useAxiosFetch;
