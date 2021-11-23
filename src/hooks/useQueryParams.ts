import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Params = { page: number; pageSize: number };

interface Options {
  defaultPage: number;
  defaultPageSize: number;
  onChangeParams?: (params: Params) => void;
}

function useQueryParams({
  defaultPage = 1,
  defaultPageSize = 10,
  onChangeParams,
}: Options) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<Params>(() => {
    const pageFromSearchParams = Number(searchParams.get("page"));
    const pageSizeFromSearchParams = Number(searchParams.get("pageSize"));
    const { pathname } = window.location;

    try {
      const encodedParamsFromLocalStorage =
        localStorage.getItem(pathname) || btoa("{}");
      const decodedParams = atob(encodedParamsFromLocalStorage);
      const { page: pageFromLocalStorage, pageSize: pageSizeFromLocalStorage } =
        JSON.parse(decodedParams);

      return {
        page: pageFromSearchParams || pageFromLocalStorage || defaultPage,
        pageSize:
          pageSizeFromSearchParams ||
          pageSizeFromLocalStorage ||
          defaultPageSize,
      };
    } catch (error) {
      console.error(error);
      localStorage.removeItem(pathname);
      return {
        page: pageFromSearchParams || defaultPage,
        pageSize: pageSizeFromSearchParams || defaultPageSize,
      };
    }
  });

  const onNextPage = () => {
    setParams((prevParams) => ({ ...prevParams, page: prevParams.page + 1 }));
  };

  const onPreviousPage = () => {
    setParams((prevParams) => {
      const previousPage = prevParams.page - 1;
      if (previousPage <= 0) return prevParams;
      return { ...prevParams, page: previousPage };
    });
  };

  const setPageSize = (newValue: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      pageSize: newValue,
      page: 1,
    }));
  };

  useEffect(() => {
    const stringifiedParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        return { ...acc, [key]: String(value) };
      },
      {}
    );
    setSearchParams(stringifiedParams, { replace: true });
    localStorage.setItem(
      window.location.pathname,
      btoa(JSON.stringify(params))
    );
  }, [params, setSearchParams]);

  useEffect(() => {
    onChangeParams?.(params);
  }, [params, onChangeParams]);

  return { ...params, onNextPage, onPreviousPage, setPageSize };
}

export default useQueryParams;
