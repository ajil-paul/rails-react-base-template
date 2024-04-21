import React, { useEffect, useRef, useState } from "react";

import { Input } from "antd";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import useFuncDebounce from "hooks/commons/useFuncDebounce";
import useQueryParams from "hooks/commons/useQueryParams";
import { buildUrl } from "utils/general";

const Search = ({
  debounceTime = 300,
  searchParamName = "search_term",
  ...inputProps
}) => {
  const { t } = useTranslation();
  const queryParams = useQueryParams({ toCamelCase: false });
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [searchValue, setSearchValue] = useState(
    queryParams?.[searchParamName] || ""
  );
  const isClearSearch = !!queryParams?.clear_search;

  const handleSearchQueryParams = trimmedValue => {
    if (!trimmedValue && !queryParams?.[searchParamName]) return;

    if (trimmedValue === queryParams?.[searchParamName]) return;

    let searchParams = {};
    const pathname = window.location.pathname;

    if (trimmedValue) searchParams = { [searchParamName]: trimmedValue };
    else delete queryParams?.[searchParamName];

    navigate(buildUrl(pathname, mergeLeft(searchParams, queryParams)));
  };

  const handleDebouncedSearchTermChange = useFuncDebounce(
    handleSearchQueryParams,
    debounceTime
  );

  const handleOnChange = e => {
    setSearchValue(e.target.value);
    const trimmedValue = e.target.value?.trim();
    handleDebouncedSearchTermChange(trimmedValue);
  };

  useEffect(() => {
    if (isClearSearch && inputRef.current) {
      const pathname = window.location.pathname;

      setSearchValue("");
      delete queryParams?.[searchParamName];
      delete queryParams?.clear_search;

      navigate(buildUrl(pathname, queryParams));
    }
  }, [isClearSearch]);

  return (
    <Input
      className="w-64"
      placeholder={t("actions.search")}
      prefix={<FiSearch className="text-gray-400" />}
      ref={inputRef}
      type="search"
      value={searchValue}
      onChange={handleOnChange}
      {...inputProps}
    />
  );
};

export default Search;
