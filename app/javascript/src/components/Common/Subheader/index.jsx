import React, { useState } from "react";

import { Button, Typography } from "antd";
import { FiFilter } from "react-icons/fi";

import Filter from "./Filter";
import FilterList from "./FilterList";

const Subheader = ({
  title,
  leftAction = null,
  rightAction = null,
  useFilterForm,
}) => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full px-6 pb-4">
      <div className="flex gap-x-2">
        <Typography.Text className="flex flex-shrink-0 font-medium" level={3}>
          {title}
        </Typography.Text>
        <FilterList {...{ setIsFilterPaneOpen }} />
        {leftAction}
      </div>
      <div className="flex items-center gap-x-2">
        {rightAction}
        <Button
          icon={<FiFilter size={16} />}
          type="text"
          onClick={() => setIsFilterPaneOpen(true)}
        />
      </div>
      <Filter
        isOpen={isFilterPaneOpen}
        setIsOpen={setIsFilterPaneOpen}
        useFilterForm={useFilterForm}
      />
    </div>
  );
};

export default Subheader;
