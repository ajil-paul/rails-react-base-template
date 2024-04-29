import React from "react";

import { Select as AntdSelect, Spin } from "antd";

const Select = props => (
  <AntdSelect
    {...props}
    notFoundContent={
      props.loading ? (
        <Spin className="flex justify-center" size="small" />
      ) : undefined
    }
  />
);

export default Select;
