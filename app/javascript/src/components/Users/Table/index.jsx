import React from "react";

import { Table as AntdTable } from "antd";

import { buildColumns } from "./utils";

const Table = ({ rowData }) => (
  <AntdTable columns={buildColumns()} dataSource={rowData} />
);

export default Table;
