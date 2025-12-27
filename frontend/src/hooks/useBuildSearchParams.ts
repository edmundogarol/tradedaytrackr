/**
 * Build the URL search params for a query
 */

interface BuildSearchParams {
  queryParams: { [key: string]: any } | undefined;
  searchParams?: URLSearchParams | null;
}

export const buildSearchParams: React.FunctionComponent<BuildSearchParams> = ({
  queryParams,
  searchParams = null,
}) => {
  const finalParams = searchParams || new URLSearchParams();

  if (queryParams) {
    for (const key of Object.keys(queryParams)) {
      const value = queryParams[key];

      if (value instanceof Array) {
        value.forEach((elem) => finalParams.append(key, elem));
      } else {
        finalParams.append(key, value);
      }
    }
  }

  return finalParams;
};

export default buildSearchParams;
