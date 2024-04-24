import React from "react";

import { Layout } from "antd";

const { Content } = Layout;

const Container = ({ children }) => (
  <Content className="h-full p-6 pt-0 overflow-y-auto bg-white">
    {children}
  </Content>
);

export default Container;
