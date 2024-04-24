import React, { useState } from "react";

import { Button, Typography } from "antd";
import { FiFilter } from "react-icons/fi";

import Filter from "./Filter";

const Subheader = ({
  title,
  leftAction = null,
  rightAction = null,
  formItems,
}) => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full px-6 pb-4">
      <div className="flex gap-x-2">
        <Typography.Text className="font-medium" level={3}>
          {title}
        </Typography.Text>
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
        formItems={formItems}
        isOpen={isFilterPaneOpen}
        setIsOpen={setIsFilterPaneOpen}
      />
    </div>
  );
};

export default Subheader;
