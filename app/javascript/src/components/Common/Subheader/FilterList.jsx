import React, { useMemo } from "react";

import { humanize } from "@bigbinary/neeto-cist";
import { Tag } from "antd";
import { omit } from "ramda";
import { useNavigate } from "react-router-dom";

import useQueryParams from "hooks/commons/useQueryParams";
import { buildUrl } from "utils/react/general";

const FilterList = () => {
  const queryParams = useQueryParams();
  const navigate = useNavigate();

  const filters = useMemo(
    () =>
      Object.entries(queryParams).filter(
        ([key, value]) => key !== "page" && value !== null
      ),
    [queryParams]
  );

  const handleCloseFilterTag = key => {
    const newParams = omit([key], queryParams);

    const pathname = window.location.pathname;
    navigate(buildUrl(pathname, newParams));
  };

  return (
    <div className="flex flex-wrap px-2 gap-y-1">
      {filters.map(([key, value]) => (
        <Tag
          closable
          className="flex max-w-lg"
          key={key}
          onClose={() => handleCloseFilterTag(key)}
        >
          <span className="w-full overflow-hidden truncate">
            <span className="font-semibold pr-0.5">{humanize(key)} : </span>
            {value}
          </span>
        </Tag>
      ))}
    </div>
  );
};

export default FilterList;
