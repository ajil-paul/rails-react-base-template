import React from "react";

import { Layout } from "antd";

const { Content } = Layout;

const Container = ({ children }) => (
  <Content className="h-full p-4 overflow-y-auto bg-white">{children}</Content>
);

export default Container;
