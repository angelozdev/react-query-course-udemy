import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Params = { page: number; page_size: number };

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
    const page = Number(searchParams.get("page"));
    const pageSize = Number(searchParams.get("page_size"));
    try {
      const { page: initialPage, page_size: initialPageSize } = JSON.parse(
        atob(localStorage.getItem(window.location.pathname) || "{}")
      );

      return {
        page: page || initialPage || defaultPage,
        page_size: pageSize || initialPageSize || defaultPageSize,
      };
    } catch (error) {
      return {
        page: page || defaultPage,
        page_size: pageSize || defaultPageSize,
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
      page_size: newValue,
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
