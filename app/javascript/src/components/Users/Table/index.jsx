import React from "react";

import { Table as AntdTable } from "antd";

import { buildColumns } from "./utils";

const Table = ({ rowData, loading }) => (
  <AntdTable
    columns={buildColumns()}
    dataSource={rowData}
    loading={loading}
    rowKey="id"
  />
);

export default Table;
